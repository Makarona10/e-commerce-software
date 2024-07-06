import { connection } from '../DB/index.js';
import { upload } from '../middleware/photos_handler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const get_store_products = async (req, res) => {
  const merchant_id = req.user_id;

  try {
    const prods = await connection.query(
      `SELECT product_name, description, price, quantity, image
            FROM products
            WHERE merchant_id = $1`,
      [merchant_id],
    );
    return res.status(200).json(prods.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error executing the query!' });
  }
};

const publish_product = async (req, res) => {
  const merchant_id = req.user_id;
  const { product_name, quantity, description, price } = req.body;

  

  console.log('The image url:' ,req.body)

  
  if (!merchant_id) return res.status(401).json({ msg: 'unauthorized!' });
  console.log('merchant_id: ' ,merchant_id)

  upload(req, res, async (err) => {
    
    if (!req.file) return res.status(400).json({ msg: 'No image uploaded!' });

    console.log(req.file);

    // if (err) {
    //   console.error('File upload error:', err);
    //   return res.status(500).json({ error: "File upload failed!" });
    // }

    // const image_url = `http://${DOMAIN_NAME}/uploads/${req.file.filename}`;

    const image_url = req.file.filename;
    
    try {
      await connection.query(
        `INSERT INTO products (product_name, description, price, quantity, image, merchant_id)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [product_name, description, price, quantity, image_url, parseInt(merchant_id)],
      );

      return res.status(200).json({ msg: 'Product uploaded successfully!' });
    } catch (err) {
      fs.unlink(path.join('uploads', req.file.filename), (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err.message}`);
        }
      });
      console.log(err);
      return res.status(500).json({ err: 'Error executing the query!' });
    }
  });
};

const update_product = async (req, res) => {
  const merchant_id = req.user_id;
  const product_id = req.params.product_id;
  const { new_quantity, new_price, new_description } = req.body;

  if (!merchant_id) return res.status(403).json({ msg: 'unauthorized!' });

  try {
    const result = await connection.query(
      `UPDATE products
            SET quantity = $1,
            price = $2,
            description = $3
            WHERE product_id = $4 AND merchant_id = $5`,
      [new_quantity, new_price, new_description, product_id, merchant_id],
    );
    if (result.rowCount === 0) return res.status(200).json({msg: 'This product doesn\'t exist'})
    res.status(200).json({msg: "Product updated successfully"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Error executing the query!' });
  }
};

const delete_product = async (req, res) => {
  const merchant_id = req.user_id;
  const product_id = req.params.product_id;

  if (!merchant_id) return res.status(403).json({ msg: 'unauthorized!' });

  try {
    connection.query('BEGIN');
    const del_row = await connection.query(
      `DELETE FROM products
            WHERE product_id = $1 AND merchant_id = $2
            RETURNING *`,
      [product_id, merchant_id],
    );
    if (del_row.rowCount === 0) return res.status(400).json({msg: 'product doesn\'t exist'});
    console.log(product_id, merchant_id);
    fs.unlink(del_row.rows[0].image, (err) => {
      if (err) {
        connection.query('ROLLBACK');
        console.error(`Failed to delete file: ${err.message}`);
      }
    connection.query('COMMIT');
    res.status(200).json({msg: 'product deleted successfully!'})
    });
  } catch (err) {
    connection.query('ROLLBACK');
    console.log(err);
    return res.status(500).json({ err: 'Error executing the query!' });
  }
};

export default {
  publish_product,
  update_product,
  delete_product,
  get_store_products,
};
