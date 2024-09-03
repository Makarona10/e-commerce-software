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

export const list_popular = async (req, res) => {
  const page_num = (req.query.page);
  try {
    const products = await connection.query(`SELECT * FROM products
                                             ORDER BY sell_times DESC
                                             OFFSET $1 LIMIT 24`, [(page_num - 1) * 24])
    res.status(200).json(products.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
};

export const list_latest = async (req, res) => {
  const page_num = (req.query.page);
  try {
    const products = await connection.query(`SELECT * FROM products
                                              ORDER BY product_id DESC
                                              OFFSET $1 LIMIT 24`, [(page_num - 1) * 24])
    res.status(200).json(products.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
}

export const list_for_subcategory = async (req, res) => {
  const sub_ctg = req.params.id;
  const page_num = (req.query.page);
  try {
    const products = await connection.query(`SELECT * FROM products
                                              LEFT OUTER JOIN product_subcategory
                                              ON products.product_id = product_subcategory.product_id
                                              WHERE product_subcategory.subcategory_id = $1
                                              OFFSET $2 LIMIT 24 ORDER BY sell_times DESC`, [sub_ctg, (page_num - 1) * 24]
    );
    res.status(200).json(products.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
}

export const search_prod = async (req, res) => {
  const prod = req.params.name;
  try {
    const prods = await connection.query(`SELECT * FROM products WHERE product_name LIKE '%' || $1 || '%'`, [prod]);
    res.status(200).json(prods.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
}
