import { ValidationChain, body } from 'express-validator';

export const nameValidator = (): ValidationChain => {
  return body('name').trim().not().isEmpty();
};
