import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { todoRouter } from '@todo-api/todo';
import { authRouter } from '@todo-api/auth';
import { ApiError } from '@todo-api/shared/domain';

const mongoClient = `mongodb+srv://${process.env.NX_PUBLIC_MONGO_USER}:${process.env.NX_PUBLIC_MONGO_PASSWORD}@cluster0.nqp4t2b.mongodb.net/todo-app?retryWrites=true&w=majority`;

export const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use('/api', todoRouter);
app.use('/api/auth', authRouter);

app.use((error: ApiError, req: Request, res: Response) => {
  const status = +error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(mongoClient)
  .then(() => {
    app.listen(3000);
    console.log('Express application listening on port 3000');
  })
  .catch((err) => console.log(err));
