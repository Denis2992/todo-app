import { throwNewError } from './throw-new-error.function';
import { ValidationError } from 'express-validator';

describe(throwNewError, () => {
  it('should throw an error with passed data', () => {
    expect(() => throwNewError(401, 'error', [{} as ValidationError])).toThrow(
      'error'
    );
  });
});
