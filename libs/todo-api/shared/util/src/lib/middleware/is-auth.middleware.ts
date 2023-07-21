import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtPrivateKey } from '@todo-api/shared/domain';
import { throwNewError } from '../functions/throw-new-error.function';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string = req.get('Authorization');

  if (!authHeader) {
    throwNewError(401, 'Not authenticated.');
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: JwtPayload;

  try {
    decodedToken = jwt.verify(token, jwtPrivateKey) as JwtPayload;
  } catch (err) {
    throwNewError(401, 'Not authenticated.');
  }

  req.body.userId = decodedToken.userId;
  next();
};
