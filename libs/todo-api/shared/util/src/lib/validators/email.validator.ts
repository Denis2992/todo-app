import { User } from '@todo-api/shared/domain';
import { ValidationChain, body } from 'express-validator';

export const emailValidator = (): ValidationChain => {
  return body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value: string) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        return Promise.reject('E-Mail address already exists!');
      }
    })
    .normalizeEmail();
};
