import { body } from 'express-validator';
import { failureObj } from '../../trait/api-traits.js';


export const validateLogin = async (req, res, next) => {
  for (let validation of loginSchema) {
    const error = await validation.run(req);
    if (!error.isEmpty()) {
      return res
        .status(400)
        .json(failureObj(400, 'wrong inputs data', error.array()));
    }
  }
  next();
};

const loginSchema = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email !'),
  body('password').notEmpty().withMessage('Please Enter a password !').isString().isStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minSymbols: 0,
    minUppercase: 1,
    minLowercase: 4,
  }).withMessage('invalid email or password !'),
];
