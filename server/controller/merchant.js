import { connection } from '../DB/index.js';
import { upload } from '../middleware/photos_handler.js';
import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';
import { dataObj, failureMsg, failureObj } from '../trait/api-traits.js';


const get_store_products = async (req, res) => {              // Updated
  const merchant_id = req.user_id;
  const page_num = parseInt(req.query.page) || 1;
  const offset = (page_num - 1) * 24;
  try {
    const products = await connection.query(
      `SELECT * FROM products
       WHERE merchant_id = $1
       AND deleted = 0
       ORDER BY id DESC
       OFFSET $2 LIMIT 24`,
      [merchant_id, offset],
    );

    const products_count = await connection.query(`
      SELECT COUNT(*) FROM products
      WHERE merchant_id = $1`, [merchant_id]
    );

    res.status(200).json({
      "data": products.rows,
      "pages": Math.ceil(parseInt(products_count.rows[0].count) / 24),
      "current_page": page_num,
    });
  } catch (err) {
    console.error("Error retrieving products", err);
    return res.status(500).json({ msg: 'Error executing the query!' });
  }
};


const get_best_sellers = async (req, res) => {                // Updated
  const merchant_id = req.user_id;
  if (!merchant_id || req.role !== 'merchant') return res.status(401).json({ msg: 'Unauhorized !' });
  try {
    const products = await connection.query(`SELECT * FROM products
      WHERE merchant_id = $1
      ORDER BY sell_times DESC
      LIMIT 20`
      , [merchant_id]);
    return res.status(200).json({
      "data": products.rows,
      "pages": 1,
      "current_page": 1,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'internal server error!' });
  }
};

const publish_product = async (req, res) => {                 // Updated
  const merchant_id = req.user_id;
  const { product_name, quantity, description, price, subcategory } = req.body;
  const errors = validationResult(req);
  const subcategories = subcategory.split(',');
  if (!merchant_id)
    return res
      .status(401)
      .json(
        failureObj(
          401,
          [],
          "Unauthorized!"
        ));
  if (!errors.isEmpty())
    return res
      .status(400)
      .json(
        failureObj(
          400,
          errors.array(),
          "Please enter valid product information"
        )
      );

  upload(req, res, async (err) => {
    // if (err) {
    //   console.error('File upload error:', err);
    //   return res.status(500).json({ error: 'File upload failed!' });
    // }
    if (!req.file) return res.status(400)
      .json(
        failureMsg(
          400, "No image uploaded"
        )
      );
    // if (!req.file) throw new Error('No image uploaded')

    try {
      const image_url = req.file.filename;
      await connection.query('BEGIN');

      const { rows } = await connection.query(
        `INSERT INTO products (product_name, description, price, quantity, image, merchant_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [product_name, description, price, quantity, image_url, parseInt(merchant_id)]
      );
      const saved_prod_id = rows[0].id;

      await Promise.all(
        subcategories.map(async (e) => {
          await connection.query(
            `INSERT INTO product_subcategory (product_id, subcategory_id) 
             VALUES ($1, $2)`, [saved_prod_id, e]
          );
        })
      );

      await connection.query('COMMIT');
      return res.status(201).json(dataObj(201, [], "Product uploaded successfully!"));
    } catch (err) {
      await connection.query('ROLLBACK');
      fs.unlink(path.join('uploads', req.file.filename), (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err.message}`);
        }
      });

      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error uploading the product!' });
    }
  });
};

const update_product = async (req, res) => {                  // Under updating
  const merchant_id = req.user_id;
  const product_id = req.params.product_id;
  const { new_quantity, new_price, new_description, new_offer } = req.body;
  const errors = validationResult(req);

  if (!merchant_id)
    return res.status(403).json({ msg: 'unauthorized!' });

  if (!errors.isEmpty())
    return res
      .status(406)
      .json(
        failureObj(
          406,
          errors.array(),
          "Please enter valid product id"
        )
      );

  try {
    const result = await connection.query(
      `UPDATE products
      SET quantity = $1,
      price = $2,
      description = $3,
      offer = $4
      WHERE id = $5 AND merchant_id = $6`,
      [new_quantity, new_price, new_description, new_offer, product_id, merchant_id],
    );
    if (result.rowCount === 0) return res.status(200).json({ msg: 'This product doesn\'t exist' })
    res.status(200).json({ msg: "Product updated successfully" })
  } catch (err) {
    console.error("Error updaing the product:", err);
    return res.status(500).json({ err: "Can't update the product now, please try again later." });
  }
};

const delete_product = async (req, res) => {
  const merchant_id = req.user_id;
  const product_id = req.params.product_id;
  const errors = validationResult(req);

  if (!merchant_id)
    return res.status(401).json({ msg: 'unauthorized!' });

  if (!errors.isEmpty())
    return res
      .status(406)
      .json(
        failureObj(
          406,
          errors.array(),
          "Please enter valid product id"
        )
      );

  try {
    connection.query('BEGIN');
    const del_row = await connection.query(
      `UPDATE products
       SET deleted = 1
       WHERE id = $1 AND merchant_id = $2
       RETURNING *`,
      [product_id, merchant_id],
    );
    if (del_row.rowCount === 0) return res.status(400).json({ msg: 'product doesn\'t exist' });

    connection.query('COMMIT');
    res.status(200).json({ msg: 'product deleted successfully!' })
  } catch (err) {
    connection.query('ROLLBACK');
    console.error("Error deleting the product:", err);
    return res.status(500).json({ err: 'Error executing the query!' });
  }
};

const get_store_info = async (req, res) => {
  const merchant_id = req.user_id;
  if (!merchant_id)
    return res.status(401).json(failureMsg(401, "Unauthorized"));

  try {
    const result = await connection.query(
      `
      SELECT * FROM merchants WHERE id = $1
      `, [merchant_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json(failureMsg(404, "Merchant Not Found!"));
    }
    return res.status(200)
      .json(
        dataObj(
          200,
          result.rows,
          "Merchant info retrieved successfully"
        ));
  } catch (err) {
    console.error(err)
    return res.status(200)
      .json(
        failureMsg(
          500,
          "Error happened while retrieving information, please try again later"
        ));
  }
}

const update_merchant = async (req, res) => {
  const merchant_id = req.user_id;
  const role = req.role;

  if (!merchant_id || role !== 'merchant') {
    return res.status(401).json(failureMsg(401, "Unauthorized!"));
  }

  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).json({ error: 'File upload failed!' });
    }

    const { name, location, about } = req.body;

    if (!name || !location || !about) {
      return res.status(400).json(failureMsg(400, "Missing required fields!"));
    }

    let image_url = null;
    if (req.file) {
      image_url = req.file.filename;
    }

    try {
      await connection.query('BEGIN');
      await connection.query(
        `UPDATE merchants SET 
          store_name = $1,
          location = $2,
          about = $3,
          img = COALESCE($4, img)
        WHERE id = $5`,
        [name, location, about, image_url, merchant_id]
      );

      await connection.query('COMMIT');
      return res.status(200).json(dataObj(200, [], "Info Updated successfully!"));

    } catch (err) {
      await connection.query('ROLLBACK');

      if (req.file) {
        fs.unlink(path.join('uploads', req.file.filename), (err) => {
          if (err) {
            console.error(`Failed to delete file: ${err.message}`);
          }
        });
      }

      console.error(err);
      return res.status(500).json(
        failureMsg(
          500,
          "Error happened while updating information, please try again later"
        )
      );
    }
  });
};


export default {
  publish_product,
  update_product,
  delete_product,
  get_store_products,
  get_best_sellers,
  update_merchant,
  get_store_info
};
