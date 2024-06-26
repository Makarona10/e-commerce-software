import { body, param } from 'express-validator';

const check_publish_body = [
  body('product_name')
    .notEmpty()
    .withMessage('Please enter a product name')
    .isLength({ min: 3, max: 16 })
    .withMessage('Product name must be the length of 3-16 letters'),
  body('quantity')
    .notEmpty()
    .withMessage('Please enter a quantity')
    .isInt({ gt: -1 })
    .withMessage('Please enter a valid quantity'),
  body('description')
    .isLength({ min: 30 })
    .withMessage('Description must be at least 30 letters'),
  body('quantity')
    .notEmpty()
    .withMessage('Please enter a price')
    .isInt({ gt: 0 })
    .withMessage('Please enter a valid price'),
];

const check_product_id = [
  param('product_id').isEmpty().withMessage('No product specified').toInt(),
];

const image_validator = async (req, res, next) => {};

export { check_product_id, check_publish_body };
