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
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().isString().isStrongPassword({
    minLength: 8,
    minNumbers: 3,
    minSymbols: 2,
    minUppercase: 2,
    minLowercase: 1,
  }),
];
