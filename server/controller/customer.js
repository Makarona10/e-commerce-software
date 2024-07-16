import { connection } from '../DB/index.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

const list_products = async (req, res) => {
  try {
    const products = await connection.query(`SELECT * FROM products`)
    res.status(200).json(products.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const list_trending = async (req, res) => {

  try {
    let stat = {};
    let result = await connection.query('SELECT TOP 100 content FROM orders').rows;

    result.forEach(order => {
      order.forEach(item => {
        item = JSON.parse(item);
        if (Object.keys(stat).includes(item.product_id.toString()))
          stat.item.product_id.toString() = stat.item.product_id + item.quantity;
        else
          stat.item.product_id.toString() = item.quantity;
      })
    })
    stat = Object.entries(stat).map(([k, val]) => {
      return { [k]: val };
    });

    stat.sort((a, b) => {
      const valueA = Object.values(a)[0];
      const valueB = Object.values(b)[0];

      if (valueA > valueB) {
        return -1;
      }
      if (valueA < valueB) {
        return 1;
      }
      return 0;
    });

    // Now we have a sorted array with stringified products IDs and their values (sales_times) based on their values
  } catch (err) {

  }
}

const list_orders = async (req, res) => {
  const user_id = req.user_id;

  if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

  try {
    const orders = await connection.query(
      `SELECT first_name, last_name, content, address, amount, status, date_created
        FROM orders LEFT JOIN clients
        ON orders.client_id = clients.client_id
        WHERE $1 = orders.client_id
        ORDER BY date_created DESC`,
      [user_id],
    );

    return res.status(200).json(orders.rows);
  } catch (err) {
    console.log('Query execution error', err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const cancel_order = async (req, res) => {
  const user_id = req.user_id;
  const order_id = req.params.order_id;

  if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

  try {
    await connection.query('BEGIN');

    const query = await connection.query(
      `SELECT * FROM orders
            WHERE order_id = $1 LIMIT 1`,
      [order_id],
    );

    const order = query.rows[0];
    // console.log(query);

    if (query.rows.length === 0)
      return res.status(404).json({ err: 'Order not found' });

    if (order.status === 'done') {
      return res.status(400).json({ err: 'Order is delivered and closed' });
    }
    for (let x = 0; x < order.content.length; x++) {
      connection.query(
        `UPDATE products
                SET quantity = quantity + $1
                WHERE product_id = $2
                `,
        [order.content[x].quantity, order.content[x].product_id]
      );
    }

    await connection.query(
      `DELETE FROM orders
            WHERE order_id = $1`,
      [order_id]
    );

    // Here comes the part of the cash back (will be handled later)

    await connection.query('COMMIT');
    return res.status(200).json({ msg: 'Order canceled successfully.' });
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ msg: 'Query execution error' });
  }
};

const place_order = async (req, res) => {
  const user_id = req.user_id;
  const { products, address } = req.body;

  if (!user_id) return res.status(401).json({ err: 'unauthorized!' });

  try {
    await Promise.all(
      products.map(async (item, idx) => {
        console.log(products);
        const result = await connection.query(
          `SELECT product_name, price
                  FROM products
                  WHERE product_id = $1`,
          [item.product_id]
        );
        if (result.rows.length > 0) {
          products[idx].price = result.rows[0].price;
          products[idx].name = result.rows[0].product_name;
        } else {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
      })
    );

    const total_amount = products.reduce((accum, ele) =>
      accum + ele['price'] * ele['quantity'],
      0
    );
    console.log('Total amount = ', total_amount)
    await connection.query('BEGIN');

    await Promise.all(
      products.map(item =>
        connection.query(
          `UPDATE products
          SET quantity = quantity - $1
          WHERE product_id = $2`,
          [item.quantity, item.product_id]
        )
      )
    );

    const result = await connection.query(
      `INSERT INTO orders (client_id, content, address, amount, active)
            VALUES ($1, $2, $3, $4, 0)
            RETURNING *`,
      [user_id, JSON.stringify(products), address, total_amount]
    );
    const order_id = parseInt(result.rows[0].order_id);
    console.log(order_id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convert dollars to cents
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `http://localhost:3000/success?id=${order_id}`, // => A page to be created (Takes the id of the order to activate the order in database)
      cancel_url: `https://example.com/cancel/${order_id}`, // => A page to be created (Takes the id of the order to delete the order from database)
    });

    console.log('Checkout Session:', session);

    await connection.query('COMMIT');
    return res.status(200).json({ msg: 'Order placed successfully!', sessionUrl: session.url });
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const confirm_payment = async (req, res) => {
  const order_id = req.params.order_id;

  try {
    const result = await connection.query(`
      UPDATE orders
      SET active = 1
      WHERE order_id = $1
      `, [order_id]);
    console.log('RRRREEEEEEEESSSSSSSSUUUUUUULLLLLLLLLTTTTTTTTTT', result);
    return res.status(200).json({ msg: 'Product activated successfully' })
  } catch (err) {
    console.log('EEEEERRRRRRRRRROOOOOOOOOOORRRRRRRRRRRRRRRRRR', err);
    return res.status(500).json({ msg: 'Payment failed!' })
  }
}

// Posts a review to a product in a specific order
const post_review = async (req, res) => {
  const user_id = req.user_id;
  const { order_id, product_id } = req.params;
  const { comment, rating } = req.body;
  let exists = 0;

  try {
    let result = await connection.query(
      `SELECT order_id, status, content
      FROM orders
      WHERE order_id = $1
      LIMIT 1`,
      [order_id],
    );

    if (result.rows.length === 0)
      return res.status(404).json({ err: 'Order not found!' });

    if (result.rows[0].status !== 'done')
      return res.status(400).json({ msg: 'Order not deliverd yet!' });

    (result.rows[0].content).forEach(async e => {
      if (Number(product_id) === Number(e.product_id)) {
        exists = 1;
        await connection.query(
          `INSERT INTO reviews (order_id, product_id, client_id, comment, rating)
                VALUES ($1, $2, $3, $4, $5)
                `,
          [order_id, product_id, user_id, comment, rating],
        );
        return res.status(200).json({ msg: 'Review published successfully!' });
      }
    });
    exists === 0 ? res.status(400).json({ msg: 'This product is not included into this order!' }) : null;

  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

export default { list_products, list_orders, cancel_order, place_order, post_review, confirm_payment };
