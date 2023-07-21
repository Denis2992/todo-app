import { ValidationChain, body } from 'express-validator';

export const passwordValidator = (): ValidationChain => {
  return body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};
