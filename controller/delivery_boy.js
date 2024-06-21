import { connection } from "../DB";



const change_status = async (req, res) => {    
    try {
        const result = await connection.query(
            `UPDATE orders
             SET status = $1
             WHERE order_id = $2`, 
            [req.body.status, req.params.order_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: `Order status updated to ${req.body.status}` });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const accept_order = async (req, res) => {
    try {
        const result = await connection.query(
            `UPDATE orders
             SET status = accepted,
             delivery_id = $1
             WHERE order_id = $2`,
            [req.user_id ,req.params.order_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order accepted' });
    } catch (error) {
        console.error('Error accepting the order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const list_pending_orders = async (req, res) => {
    
    try {
        const result = await connection.query(
            `SELECT first_name, last_name, content, address, amount, date_created
            FROM orders LEFT JOIN clients
            ON orders.client_id = clients.client_id
            WHERE status = 'pending'`);
        
        return res.status(200).json(result.rows); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: 'Error executing the query!'})
    }
} 

const list_worker_orders = async (req, res) => {
    const user_id = req.user_id;

    try {
        const result = connection.query(
            `SELECT order_id, first_name, last_name, address, amount, status, phone_number, deliver_date
            FROM orders
            LEFT JOIN clients ON clients.clients_id = orders.client_id
            LEFT JOIN users ON clients.clients_id = users.id
            WHERE orders.delivery_id = $1`,
            [user_id]
        );
        return res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: 'Error executing the query!'});
    }
}


export { change_status, accept_order, list_pending_orders, list_worker_orders }