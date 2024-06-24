import { connection } from "../DB";


const list_orders = async (req, res) => {
    const user_id = req.user_id;

    if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

    try {
        const orders = await connection.query(`SELECT first_name, last_name, content, address, amount, status, date_created
        FROM orders LEFT JOIN clients
        ON orders.client_id = clients.client_id
        WHERE $1 = client_id
        ORDER BY date_created DESC`, [user_id]);

        return res.status(200).json(orders.rows)
    } catch (err) {
        console.log('Query execution error', err)
        return res.status(500).json({ err: 'Internal server error' });
    }
};


const cancel_order = async (req, res) => {
    const user_id = req.user_id;
    const order_id = req.params.order_id;

    if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

    try {
        await connection.query('BEGIN');

        const query = await connection.query(`SELECT status FROM orders
            WHERE order_id = $1 LIMIT 1`, [order_id])

        const order = query.rows[0];
        
        if (query.rows.length === 0)
            return res.status(404).json({ err: 'Order not found' });

        if (order.status === 'done') {
            return res.status(400).json({ err: 'Order is delivered and closed' })
        }

        for (let x=0; x < (order.content).length; x++){
            await connection.query(
                `UPDATE products
                SET quantity = quantity + $1
                WHERE id = $2
                `,[order.content[x].quantity], [order.content[x].product_id]);
        }

        await connection.query(
            `DELETE FROM orders
            WHERE order_id = $1`, [order_id]
        );

        // Here comes the part of the cash back (will be handled later)

        await connection.query('COMMIT');
        return res.status(200).json({ msg: 'Order canceled successfully.' })
    } catch (err) {
        await connection.query('ROLLBACK')
        console.error(err);
        return res.status(500).json({ msg: 'Query execution error' })
    }
};

const place_order = async (req, res) => {
    const user_id = req.user_id;
    const products = req.body.cart;
    const address = req.body.address;

    if (!user_id) return res.status(403).json({ err: 'unauthorized!' });

    const amount = products.reduce((total, obj) => total + obj['amount'] * obj['quantity'], 0);

    try {
        await connection.query('BEGIN');

        for (let x = 0; products[x]; x++) {
            await connection.query(
                `UPDATE products
                SET quantity = quantity - $1
                WHERE id = $2`,
                products[x]['quantity'], products[x]['id']
            );
        }

        // Here comes the payment part

        await connection.query(
            `INSERT INTO orders (client_id, content, address, amount)
            VALUES ($1, $2, $3, $4)`,
            [user_id, JSON.stringify(products), address, amount]
            
        );

        await connection.query('COMMIT');
        return res.status(200).json({msg: 'Order placed successfully!'});

    } catch (err) {
        await connection.query('ROLLBACK');
        console.log(err);
        return res.status(500).json({ err: 'Error executing the query' });
    }

};


// Posts a review to a product in a specific order
const post_review = async (req, res) => {
    const user_id = req.user_id;
    const {order_id, product_id} = req.params;
    const {comment, rating} = req.body;

    try {
        let result = await connection.query(
            `SELECT order_id
            FROM orders
            WHERE order_id = $1
            LIMIT 1`, [req.params.order_id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({err: 'Order not found!'});

        if (result.rows[0].status !== 'done')
            return res.status(400).json({msg: 'Order not deliverd yet!'});

        await connection.query(
            `INSERT INTO reviews (order_id, product_id, client_id, comment, rating)
            VALUES ($1, $2, $3, $4, $5)
            `, [order_id, product_id, user_id, comment, rating]
        )
        
        return res.status(200).json({ msg: 'Review published successfully!' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Error executing the query' });
    }
};


export default { list_orders, cancel_order, place_order, post_review }