import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { handleError, checkData, throwNewError } from '@todo-api/shared/util';
import { Todo, User } from '@todo-api/shared/domain';

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;

  try {
    const user = await User.findById(userId);

    const mappedTodos = user.todos.map((todo) => ({
      title: todo.title,
      checked: todo.checked,
      id: todo._id,
    }));

    res.status(200).json({
      message: 'Fetched posts successfully.',
      todos: mappedTodos,
    });
  } catch (err) {
    handleError(err, next);
  }
};

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwNewError(422, 'Validation failed, entered data is incorrect.');
  }

  const userId = req.body.userId;
  const todo = new Todo({
    title: req.body.title,
    checked: false,
  });

  try {
    const user = await User.updateOne(
      { _id: userId },
      { $push: { todos: todo } }
    );

    checkData(user);

    res.status(201).json({
      message: 'Todo created successfully!',
      todo: {
        id: todo._id,
        title: todo.title,
        checked: todo.checked,
      },
    });
  } catch (err) {
    handleError(err, next);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;
  const todoId: string = req.params.todoId;

  try {
    const todo = (await User.findById(userId)).todos.find(
      (todo) => todo._id.toString() === todoId.toString()
    );

    const user = await User.updateOne(
      { _id: userId },
      { $set: { 'todos.$[todo].checked': !todo.checked } },
      { arrayFilters: [{ 'todo._id': todoId }] }
    );

    checkData(user);

    res.status(200).json({ message: 'Todo updated' });
  } catch (err) {
    handleError(err, next);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;
  const todoId: string = req.params.todoId;

  try {
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: todoId } } }
    );

    checkData(user);

    res.status(200).json({ message: 'Deleted todo.', todoId });
  } catch (err) {
    handleError(err, next);
  }
};

export const deleteCompletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;

  try {
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { todos: { checked: true } } }
    );

    checkData(user);

    res.status(200).json({ message: 'Deleted completed todos.' });
  } catch (err) {
    handleError(err, next);
  }
};
