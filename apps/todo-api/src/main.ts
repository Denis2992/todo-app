import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { todoRouter } from '@todo-api/todo';
import { authRouter } from '@todo-api/auth';
import { ApiError } from '@todo-api/shared/domain';

const mongoClient =
  'mongodb+srv://Denis299:fWglYTNTmSwNEpBk@cluster0.nqp4t2b.mongodb.net/todo-app?retryWrites=true&w=majority';

export const app = express();

app.use(bodyParser.json());
app.use('/api', todoRouter);
app.use('/api/auth', authRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = +error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 3000;
mongoose
  .connect(mongoClient)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
