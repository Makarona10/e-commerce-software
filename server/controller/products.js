import { validationResult } from 'express-validator';
import { connection } from '../DB/index.js';
import { dataObj, failureMsg } from '../trait/api-traits.js';


export const list_popular = async (req, res) => {
  const page_num = (req.query.page);
  try {
    const products = await connection.query(`SELECT * FROM products
                                             WHERE deleted = 0
                                             ORDER BY sell_times DESC
                                             OFFSET $1 LIMIT 24`, [(page_num - 1) * 24]);
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    res.status(200).json({
      "data": products.rows,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const list_latest = async (req, res) => {
  const page_num = parseInt(req.query.page);
  try {
    const products = await connection.query(`SELECT * FROM products
                                              WHERE deleted = 0
                                              ORDER BY id DESC
                                              OFFSET $1 LIMIT 24`, [(page_num - 1) * 24]);
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    return res.status(200).json({
      "data": products.rows,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const list_for_subcategory = async (req, res) => {
  const sub_ctg = req.params.id;
  const page_num = req.query.page;
  try {
    const products = await connection.query(`SELECT * FROM products
      LEFT OUTER JOIN product_subcategory
      ON products.id = product_subcategory.product_id
      WHERE product_subcategory.subcategory_id = $1
      AND deleted = 0
      OFFSET $2 LIMIT 24 ORDER BY sell_times DESC`, [sub_ctg, (page_num - 1) * 24]
    );
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    res.status(200).json({
      "data": products.rows,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const search_prod = async (req, res) => {
  const prod = req.params.name;
  const page_num = (req.query.page) || 1;
  try {
    const products = await connection.query(`
      SELECT * FROM products
      WHERE UPPER(product_name) LIKE '%' || UPPER($1) || '%'
      AND deleted = 0
      OFFSET $2 LIMIT 24
      `, [prod, ((page_num - 1) * 24)]);

    const products_count = await connection.query(`SELECT COUNT(*)
          FROM products WHERE product_name LIKE '%' || $1 || '%'`, [prod]);

    res.status(200).json({
      "data": products.rows,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error('Error retrieving product:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const get_product = async (req, res) => {
  const prod_id = parseInt(req.params.id);
  const errors = validationResult(req);
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
    const rows = await connection.query(`
          SELECT products.*, reviews.comment, (SELECT AVG(rating) FROM reviews WHERE product_id = $1) AS rating
          FROM reviews 
          FULL JOIN products ON products.id = reviews.product_id
          WHERE products.id = $1
          AND deleted = 0`
      , [prod_id]);
    const product = rows.rows;

    if (!product) {
      return res.status(404).json(
        failureMsg(
          404,
          'Product not found'
        )
      );
    };

    return res.status(200).json(
      dataObj
        (
          200,
          product,
          "Product retrieved successfully",
        ));
  } catch (err) {
    console.error('Error retrieving product:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const filterd_products = async (req, res) => {
  const { price, subcategory, inStock, page } = req.query;
  const offset = (page - 1) * 24 || 0;

  try {
    let query = `SELECT * FROM products 
    JOIN product_subcategory ON products.id = product_subcategory.product_id
    WHERE price BETWEEN $1 AND $2`;
    
    const queryParams = [price[0], price[1]];
    
    if (subcategory) {
      query += ` AND product_subcategory.subcategory_id = $3`;
      queryParams.push(subcategory);
    }
    
    if (inStock === 'true') {
      query += ` AND products.quantity > 0`;
    }
    
    query += ` AND deleted = 0 ORDER BY sell_times DESC OFFSET $${queryParams.length + 1} LIMIT 24`;
    queryParams.push(offset);

    const result = await connection.query(query, queryParams);
    
    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
      message: 'Filtered products retrieved successfully'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error happened while retrieving products!'
    });
  }
};

export const top_rated = async (req, res) => {
  const page_num = req.query.page;
  try {
    const result = await connection.query(`
      SELECT products.* FROM products LEFT JOIN reviews
      ON products.id = reviews.product_id
      WHERE deleted = 0
      ORDER BY reviews.rating DESC
      OFFSET $1 LIMIT 24`, [((page_num - 1) * 24)]);
    const products = result.rows
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    res.status(200).json({
      "data": products,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error('Error listing products', err);
    res.status(500).json({ err: 'Error while listing products!' });
  }
};

export const get_product_reviews = async (req, res) => {
  const product_id = req.params.id;
  const errors = validationResult(req);

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
    const result = await connection.query(`
      SELECT * FROM reviews
      JOIN clients ON clients.client_id = reviews.client_id
      WHERE product_id = $1`,
      [product_id]);
    const reviews = result.rows
    res.status(200).json({
      "data": reviews,
    });
  } catch (err) {
    console.error('Error fetching reviews:', err)
    res.status(500).json({ err: "Error happened while loading reviews!" });
  }
};

export const list_trending = async (req, res) => {
  const page_num = req.query.page;
  try {
    const result = await connection.query(
      `SELECT products.*, COUNT(products.product_name) AS sales_count
       FROM products FULL JOIN cart
       ON products.id = cart.product_id
       WHERE deleted = 0
       GROUP BY products.id ORDER BY sales_count DESC
       OFFSET $1 LIMIT 24
      `, [((page_num - 1) * 24)]);
    const products = result.rows;
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    res.status(200).json({
      "data": products,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ err: "Error happened while loading products!" });
  }
};

export const list_offers = async (req, res) => {
  const page_num = parseInt(req.query.page) || 0;
  try {
    const result = await connection.query(
      `SELECT * FROM products WHERE offer IS NOT NULL
       AND deleted = 0 OFFSET $1 LIMIT 24`,
      [((page_num - 1) * 24)]);
    const products = result.rows;
    const products_count = await connection.query(`SELECT COUNT(*) FROM products`);
    res.status(200).json({
      "data": products,
      "pages": Math.ceil(parseInt(products_count / 24)),
      "current_page": page_num,
    });
  } catch (err) {
    console.error("Error loading offers products:", err);
    res.status(500).failureMsg(500, "Error happened while loading products!");
  }
};
