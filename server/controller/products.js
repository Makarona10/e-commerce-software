import { connection } from '../DB/index.js';

export const list_products = async (req, res) => {
    try {
        const products = await connection.query(`SELECT * FROM products ORDER BY product_id DESC`);
        res.status(200).json(products.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}