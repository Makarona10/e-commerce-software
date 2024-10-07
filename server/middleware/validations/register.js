import { body, validationResult } from 'express-validator';
import { failureMsg, failureObj } from '../../trait/api-traits.js';

export const validateRegister = async (req, res, next) => {
  const result1 = await checkUserType.run(req);
  if (!result1.isEmpty())
    return res.status(422).json(failureMsg(422, 'wrong user type!'));

  const userType = req.body.user_type;
  let validationChain = [];

  if (userType === 'client') {
    validationChain = validateClient;
  } else if (userType === 'merchant') {
    validationChain = validateMerchant;
  } else if (userType === 'delivery_boy') {
    validationChain = validateDeliveryBoy;
  }
  for (let validation of validationChain) {
    const result = await validation.run(req);
    if (result.errors.length)
      return res.status(422).json({
        errors: result.errors,
      });
  }
  next();
};

export const checkUserType = body('user_type').isIn([
  'client',
  'merchant',
  'delivery_boy',
]);

export const phoneValidation = body('mobile').isMobilePhone(['ar-EG']).withMessage('Please enter a valid phone number!');

export const passwordValidation = [
  body('password').notEmpty().withMessage('Please enter a password')
  .isString().isStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minSymbols: 0,
    minUppercase: 1,
    minLowercase: 4,
  }).withMessage('Please enter a strong password with at least 8 characters, 2 numbers, 1 uppercase letter, and 4 lowercase letters.'),

  body('password_confirmation').notEmpty().withMessage('Password confirmation is required.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match!');
      }
      return true;
    }).withMessage('Passwords do not match!'),
];

export const validateClient = [
  body('first_name').notEmpty().withMessage('Enter the first name please!').isString().isLength({
    max: 25,
    min: 2,
  }).withMessage('First name must be at least 2 letters!'),
  body('last_name').notEmpty().withMessage('Enter the last name please!').isString().isLength({
    max: 25,
    min: 2,
  }).withMessage('Last name must be at least 2 letters!'),
  phoneValidation,
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email!'),
  ...passwordValidation,
];

export const validateMerchant = [
  body('store_name').isString().isLength({
    max: 30,
    min: 2,
  }).withMessage('Please enter a valid store name!'),
  body('location').notEmpty().withMessage('Enter your store location please!').isString().isLength({
    max: 255,
  }).withMessage('Location must be 255 characters at most!'),
  phoneValidation,
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email!'),
  ...passwordValidation,
];

export const validateDeliveryBoy = [
  body('first_name').notEmpty().withMessage('Enter the first name please!').isString().withMessage('Enter the first name please!').isLength({
    max: 25,
    min: 2,
  }).withMessage('First name must be at least 2 letters!'),
  body('last_name').notEmpty().withMessage('Enter the first name please!').isString().isLength({
    max: 25,
    min: 2,
  }).withMessage('Last name must be at least 2 letters!!'),
  phoneValidation,
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email!'),
  ...passwordValidation,
];
