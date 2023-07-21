import { HttpError } from 'http-errors';

export const checkData = <T>(data: T) => {
  if (!data) {
    const error = new Error('Could not find user.') as HttpError;
    error.statusCode = 404;
    throw error;
  }
};
