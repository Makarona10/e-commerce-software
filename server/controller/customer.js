import { connection } from '../DB/index.js';
import Stripe from 'stripe';
import { dataObj, failureMsg, failureObj } from '../trait/api-traits.js';

const stripe = new Stripe(process.env.STRIPE_KEY);


const list_orders = async (req, res) => {
  const user_id = req.user_id;
  if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

  try {
    const orders = await connection.query(
      `SELECT orders.id, first_name, last_name, address, amount, status, orders.date_created, orders.canceled
        FROM orders LEFT JOIN clients
        ON orders.client_id = clients.client_id
        WHERE orders.client_id = $1
        AND active = 1
        ORDER BY date_created DESC`,
      [user_id],
    );

    return res.status(200).json(orders.rows);
  } catch (err) {
    console.error('Error while listing client orders:', err);
    return res.status(500).json({ err: "Error happened while listing orders!" });
  }
};

const get_order_items = async (req, res) => {
  const user_id = req.user_id;
  const order_id = req.params.order_id;
  if (!user_id) return res.status(403).json({ err: 'unauthorized!' });
  try {
    const result = await connection.query(
      `
        SELECT cart.order_id, products.id, products.product_name,
        products.image, products.price, products.offer, cart.quantity
        FROM products RIGHT JOIN cart ON cart.product_id = products.id
        WHERE cart.order_id = $1
      `, [order_id]);
    if (result.rowCount === 0) {
      return res.status(404).json(
        failureObj(
          404,
          'Order Not Found!')
      );
    }
    return res.status(200).json(
      dataObj(
        200,
        result.rows,
        'Order found successfully'
      )
    );
  } catch (err) {
    console.error(`Error happened while finding items of order ${order_id}`, err);
    return res.status(500).json(
      failureMsg(
        500,
        'Error happened while fetching the order items'
      )
    )
  }
}

const cancel_order = async (req, res) => {
  const user_id = req.user_id;
  const order_id = req.params.order_id;

  if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

  try {
    await connection.query('BEGIN');

    const query = await connection.query(
      `SELECT * FROM orders WHERE id = $1 LIMIT 1`,
      [order_id]
    );

    if (query.rowCount === 0)
      return res.status(404).json({ err: 'Order not found' });

    const order = query.rows[0];


    if (order.status === 'done') {
      return res.status(400).json({ err: 'Order is delivered and closed' });
    }

    const items = await connection.query(`
      SELECT * FROM cart WHERE order_id = $1
      `, [order.id]);

    for (let x = 0; x < items.rowCount; x++) {
      connection.query(
        `
        UPDATE products
        SET quantity = quantity + $1
        WHERE id = $2
        `,
        [items.rows[x].quantity, items.rows[x].product_id]
      );
    }

    await connection.query(
      `UPDATE orders
       SET canceled = 1 
       WHERE id = $1`,
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
    await connection.query('BEGIN');
    await Promise.all(
      products.map(async (item, idx) => {
        const result = await connection.query(
          `SELECT product_name, price, offer
                  FROM products
                  WHERE id = $1`,
          [item.id]
        );
        if (result.rows.length > 0) {
          products[idx].price = result.rows[0].offer ?
          result.rows[0].offer : result.rows[0].price;
          products[idx].name = result.rows[0].product_name;
        } else {
          return res
            .status(404)
            .json(
              failureMsg(
                404,
                "Products Not Found!"
              )
            );
        }
      })
    );

    const total_amount = products.reduce((accum, ele) =>
      accum + ele['price'] * ele['quantity'],
      0
    );
    console.log('Total amount = ', total_amount)

    // await Promise.all(
    //   products.map(item =>
    //     connection.query(
    //       `UPDATE products
    //       SET quantity = quantity - $1,
    //       sell_times = sell_times + $1
    //       WHERE id = $2`,
    //       [item.quantity, item.id]
    //     )
    //   )
    // );

    const result = await connection.query(
      `INSERT INTO orders (client_id, address, amount, active)
            VALUES ($1, $2, $3, 0)
            RETURNING *`,
      [user_id, address, total_amount]
    );
    const order_id = parseInt(result.rows[0].id);
    await Promise.all(
      products.map(async item => {
        await connection.query(
          `
          INSERT INTO cart (order_id, product_id, quantity)
          VALUES ($1, $2, $3)
          `, [order_id, item.id, item.quantity]
        )
      })
    );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `http://localhost:3000/success?id=${order_id}`, // => A page to be created (Takes the id of the order to activate the order in database)
      cancel_url: `https://example.com/cancel/${order_id}`, // => A page to be created (Takes the id of the order to delete the order from database)
    });

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
    await connection.query('BEGIN');
    let result = await connection.query(`
      SELECT * FROM cart WHERE order_id = $1
      `, [order_id]);

    const products = result.rows;

    Promise.all(products.map(async p => {
      await connection.query(`
        UPDATE products
        SET quantity = quantity - $1,
        sell_times = sell_times + $1
        WHERE id = $2
      `, [p.quantity, p.product_id])
    }));

    await connection.query(`
      UPDATE orders
      SET active = 1
      WHERE id = $1
      RETURNING id
      `, [order_id]);

    await connection.query('COMMIT');
    return res.status(200).json({ msg: 'Product activated successfully' })
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error('Payment failed', err);
    return res.status(500).json({ msg: 'Payment failed!' })
  }
}

// Posts a review to a product in a specific order
const post_review = async (req, res) => {
  const user_id = req.user_id;
  const { product_id } = req.params;
  const { comment, rating } = req.body;

  if (!user_id) return res.status(401).json(
    failureMsg(401, 'Unauthorized')
  );

  try {
    let checkProduct = await connection.query(
      `SELECT * FROM products WHERE id = $1`,
      [product_id],
    );
    if (checkProduct.rowCount === 0)
      return res.status(404).json(failureMsg(404, 'Product Not Found'));


    const checkReviewed = await connection.query(
      `SELECT * FROM reviews WHERE product_id = $1 AND client_id = $2`,
      [product_id, user_id]
    );
    if (checkReviewed.rowCount !== 0)
      return res.status(400).json(failureMsg(400, 'You already reviewed this product before'));


    await connection.query(`
      INSERT INTO reviews (product_id, client_id, comment, rating)
      VALUES ($1, $2, $3, $4)`
      , [product_id, user_id, comment, rating]);

    return res.status(201).json(
      dataObj(201, [], 'Review published successfully!')
    );

  } catch (err) {
    console.error("Error posting a review", err);
    return res.status(500).json({ err: "Can't post review now, please try again later." });
  }
};

export default {
  list_orders,
  cancel_order,
  place_order,
  post_review,
  confirm_payment,
  get_order_items
};
