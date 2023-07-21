import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '@todo-api/shared/util';
import { Router } from 'express';
import * as authController from '../controllers/auth-controller';
import { body } from 'express-validator';

export const authRouter = Router();

authRouter.post(
  '/signup',
  [emailValidator(), passwordValidator(), nameValidator()],
  authController.signUp
);

authRouter.post(
  '/login',
  [body('email').isEmail(), body('password').trim().isLength({ min: 8 })],
  authController.login
);
