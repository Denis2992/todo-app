import * as jwt from 'jsonwebtoken';
import { jwtPrivateKey } from '@todo-api/shared/domain';
import { NextFunction, Request, Response } from 'express';
import { isAuth } from './is-auth.middleware';
import * as errorHandler from '../functions/throw-new-error.function';

describe('isAuth middleware', () => {
  it('should set userId successfully', () => {
    const validToken = jwt.sign({ userId: 'testUserId' }, jwtPrivateKey);

    const req = {
      get: (headerName: string) => {
        if (headerName === 'Authorization') {
          return `Bearer ${validToken}`;
        }
        return undefined;
      },
      body: { userId: null },
    } as unknown as Request;

    const res = {} as Response;

    const next: NextFunction = jest.fn();

    isAuth(req, res, next);

    expect(req.body.userId).toBe('testUserId');
    expect(next).toBeCalled();
  });

  it('should throw an error when auth header is not set', () => {
    const req = {
      get: () => undefined,
      body: { userId: null },
    } as unknown as Request;
    const res = {} as Response;
    const next: NextFunction = jest.fn();

    jest.spyOn(errorHandler, 'throwNewError').mockImplementation(() => {
      throw new Error('Not authenticated.');
    });

    expect(() => isAuth(req, res, next)).toThrow('Not authenticated.');
    expect(next).not.toBeCalled();
  });

  it('should throw an error when auth token does not verified', () => {
    const validToken = jwt.sign({ userId: 'testUserId' }, 'test');

    const req = {
      get: (headerName: string) => {
        if (headerName === 'Authorization') {
          return `Bearer ${validToken}`;
        }
        return undefined;
      },
      body: { userId: null },
    } as unknown as Request;
    const res = {} as Response;
    const next: NextFunction = jest.fn();

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Not Verified');
    });
    jest.spyOn(errorHandler, 'throwNewError').mockImplementation(() => {
      throw new Error('Not authenticated.');
    });

    expect(() => isAuth(req, res, next)).toThrow('Not authenticated.');
    expect(jwt.verify).toHaveBeenCalled();
    expect(next).not.toBeCalled();
  });
});
