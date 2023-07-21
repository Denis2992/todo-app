import { ApiError } from '@todo-api/shared/domain';
import { ValidationError } from 'express-validator';

export const throwNewError = (
  errorCode: number,
  message: string,
  data: ValidationError[] = []
) => {
  const error = new ApiError(message);
  error.status = errorCode;

  if (data.length > 0) {
    error.data = data;
  }

  throw error;
};
