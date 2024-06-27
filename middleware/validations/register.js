import { body } from 'express-validator';
import { failureMsg } from '../../trait/api-traits.js';
import { validationResult } from 'express-validator';

export const validateRegister = async (req, res, next) => {
  const result1 = await checkUserType.run(req);
  if (!result1.isEmpty())
    return res.json(400).json(failureMsg(400, 'wrong user type!'));

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
    await validation.run(req);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export const checkUserType = body('user_type').isIn([
  'client',
  'merchant',
  'delivery_boy',
]);

export const phoneValidation = body('mobile').isMobilePhone(['ar-EG']);

export const passwordValidation = [
  body('password').notEmpty().isString().isStrongPassword({
    minLength: 8,
    minNumbers: 3,
    minSymbols: 2,
    minUppercase: 2,
    minLowercase: 1,
  }),
  body('password_confirmation').custom((value, { req }) => {
    return value === req.body.password;
  }),
];

export const validateClient = [
  body('first_name').notEmpty().isString().isLength({
    max: 25,
    min: 2,
  }),
  body('last_name').notEmpty().isString().isLength({
    max: 25,
    min: 2,
  }),
  phoneValidation,
  body('email').isEmail().normalizeEmail(),
  ...passwordValidation,
];

export const validateMerchant = [
  body('store_name').isString().isLength({
    max: 30,
    min: 2,
  }),
  body('location').notEmpty().isString().isLength({
    max: 255,
  }),
  phoneValidation,
  body('email').isEmail().normalizeEmail(),
  ...passwordValidation,
];

export const validateDeliveryBoy = [
  body('first_name').notEmpty().isString().isLength({
    max: 25,
    min: 2,
  }),
  body('last_name').notEmpty().isString().isLength({
    max: 25,
    min: 2,
  }),
  phoneValidation,
  body('email').isEmail().normalizeEmail(),
  ...passwordValidation,
];
