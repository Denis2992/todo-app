import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';

import { jwtPrivateKey, User } from '@todo-api/shared/domain';
import { handleError, throwNewError } from '@todo-api/shared/util';

const saltRounds = 10;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  const email: string = req.body.email;
  const name: string = req.body.name;
  const password: string = req.body.password;
  try {
    if (!errors.isEmpty()) {
      throwNewError(422, 'Validation failed.', errors.array());
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    const result = await user.save();
    res.status(201).json({
      message: 'User created!',
      userId: result._id,
      userName: result.name,
    });
  } catch (err) {
    handleError(err, next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  let loadedUser;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throwNewError(401, 'Wrong email or password');
    }

    loadedUser = user;

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throwNewError(401, 'Wrong email or password');
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      jwtPrivateKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login succeed',
      token,
      userId: loadedUser._id.toString(),
      userName: user.name,
    });
  } catch (err) {
    handleError(err, next);
  }
};
