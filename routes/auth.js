import express from 'express';
import { loginController, registerController } from '../controller/auth.js';
import { validateRegister } from '../middleware/validations/register.js';
import { validateLogin } from '../middleware/validations/login.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegister, registerController);

authRouter.post('/login', validateLogin, loginController);
