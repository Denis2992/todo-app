import { NextFunction } from 'express';
import { handleError } from './error-hander.function';

describe('handleError', () => {
  it('should pass error to next function', () => {
    const error = new Error('error');
    const next = jest.fn() as NextFunction;

    handleError(error, next);

    expect(next).toHaveBeenCalled();
  });
});
