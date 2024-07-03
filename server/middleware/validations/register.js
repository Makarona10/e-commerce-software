import { body, validationResult } from 'express-validator';
import { failureMsg, failureObj } from '../../trait/api-traits.js';

export const validateRegister = async (req, res, next) => {
  const result1 = await checkUserType.run(req);
  if (!result1.isEmpty())
<<<<<<< HEAD
    return res.status(400).json(failureMsg(400, result1));
=======
    return res.status(422).json(failureMsg(422, 'wrong user type!'));
>>>>>>> 7f3de5262d72a7df67209e9139270018269659ec

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
