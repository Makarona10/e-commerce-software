import { connection } from "../DB";


const list_orders = async (req, res) => {
    const user_id = req.user_id;

    if (!user_id) return res.status(403).json({err: 'unauthorized!'});

    try {
        const orders = await connection.query(`SELECT first_name, last_name, content, address, amount, status, date_created
        FROM orders LEFT JOIN clients
        ON orders.client_id = clients.client_id
        WHERE $1 = client_id
        ORDER BY date_created DESC`, [user_id]);
    
        return res.status(200).json(orders.rows)
    } catch (err) {
        console.log('Query execution error', err)
        return res.status(500).json({err: 'Internal server error'});
    }
};


const cancel_order = async (req, res) => {
    const user_id = req.user_id;
    const order_id = req.params.order_id;

    if (!user_id) return res.status(403).json({err: 'unauthorized!'});

    try {
        const check = await connection.query(`SELECT * FROM orders
            WHERE order_id = $1 LIMIT 1`, [order_id])
        if (check.rows[0].status === 'done') {
            return res.status(400).json({err: 'Order is delivered and closed'})
        }
        const result = await connection.query(`DELETE FROM orders
            WHERE order_id = $1`, [order_id]);

        // Here comes the part of the cash back (will be handled later)
        
        return res.status(200).json({msg: 'Order canceled successfully.'})
    } catch (err) {
        return res.status(500).json({msg: 'Query execution error'})
    }
};




export {list_orders, cancel_order}