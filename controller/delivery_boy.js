import { connection } from "../DB"

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

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { accept_order }