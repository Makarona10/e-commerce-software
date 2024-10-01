import { body, param } from 'express-validator';

const check_publish_body = [
  body('product_name')
    .notEmpty()
    .withMessage('Please enter a product name')
    .isLength({ min: 3, max: 128 })
    .withMessage('Product name must be the length of 3-128 letters'),
  body('price')
    .notEmpty()
    .withMessage('Please enter a price')
    .isInt({ gt: 0 })
    .withMessage('Please enter a valid price'),
  body('description')
    .isLength({ min: 30 })
    .withMessage('Description must be at least 30 letters'),
    body('subcategory')
      .notEmpty()
      .withMessage('Please enter a subcategory for the product'),
    body('quantity')
    .notEmpty()
    .withMessage('Please enter a quantity')
    .isInt({ gt: -1 })
    .withMessage('Please enter a valid quantity'),
];

const check_product_id = [
  param('product_id').isInt().withMessage('Please enter id as a number').toInt(),
];

const image_validator = async (req, res, next) => {
  
};

export { check_product_id, check_publish_body };
