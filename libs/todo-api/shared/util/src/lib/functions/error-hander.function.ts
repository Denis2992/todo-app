import { ApiError } from '@todo-api/shared/domain';
import { NextFunction } from 'express';

export const handleError = (err: ApiError, next: NextFunction) => {
  if (!err.status) {
    console.log(err);
    err.status = 500;
  }
  next(err);
};
