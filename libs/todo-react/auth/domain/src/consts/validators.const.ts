import {
  FieldValues,
  RegisterOptions,
  UseFormGetValues,
} from 'react-hook-form';
import { SignupPayload } from '@todo-app/shared/domain';

export const emailValidator: RegisterOptions<FieldValues, string> = {
  required: 'This is required field',
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email is invalid',
  },
};

export const nameValidator: RegisterOptions<FieldValues, string> = {
  required: 'This is required field',
  minLength: {
    value: 2,
    message: 'This field has to contain min. 2 characters',
  },
};

export const loginPasswordValidator: RegisterOptions<FieldValues, string> = {
  required: 'This is required field',
  minLength: {
    value: 8,
    message: 'This field has to contain min. 8 characters',
  },
};

export const confirmPasswordValidator = (
  getValues: UseFormGetValues<SignupPayload>
): RegisterOptions<FieldValues, string> => ({
  required: 'This is required field',
  validate: (value) =>
    value === getValues('password') || "Passwords don't equal",
});

export const signUpPasswordValidator: RegisterOptions<FieldValues, string> = {
  required: 'This is required field',
  minLength: {
    value: 8,
    message: 'This field has to contain min. 8 characters',
  },
  pattern: {
    value:
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    message:
      'This field has to contain at least one uppercase letter, one lowercase letter, one number and one special character',
  },
};
