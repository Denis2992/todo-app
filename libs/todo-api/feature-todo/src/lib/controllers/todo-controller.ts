import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { handleError, checkData, throwNewError } from '@todo-api/shared/util';
import { Todo as TodoDTO } from '@todo-app/shared/domain';
import { prepareTodoIndex } from '../helpers/prepare-todo-index.helper';
import { Todo, User } from '@todo-api/shared/domain';

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;

  try {
    const user = await User.findById(userId);

    res.status(200).json({
      message: 'Fetched todos successfully.',
      todos: user.todos.map((todo) => ({
        title: todo.title,
        checked: todo.checked,
        id: todo._id,
        index: todo.index,
      })),
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

  const userId: string = req.body.userId;

  try {
    const todoIndex = await prepareTodoIndex(userId);

    const todo = new Todo({
      title: req.body.title,
      checked: false,
      index: todoIndex,
    });

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
        index: todo.index,
      },
    });
  } catch (err) {
    handleError(err, next);
  }
};

export const addManyTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todos: TodoDTO[] = req.body.todos;
  const userId: string = req.body.userId;

  try {
    let todoIndex = await prepareTodoIndex(userId);

    const newTodos = todos.map((todo: TodoDTO) => {
      const newTodo = new Todo({
        title: todo.title,
        checked: todo.checked,
        index: todoIndex,
      });

      todoIndex++;

      return newTodo;
    });

    const user = await User.updateOne(
      { _id: userId },
      { $push: { todos: newTodos } }
    );

    checkData(user);

    const mappedTodos = (await User.findById(userId)).todos.map((todo) => ({
      title: todo.title,
      checked: todo.checked,
      id: todo._id,
      index: todo.index,
    }));

    res.status(201).json({
      message: 'Todos created and fetched successfully!',
      todos: mappedTodos,
    });
  } catch (err) {
    handleError(err, next);
  }
};

export const updateTodoStatus = async (
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

export const updateTodosOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todos: TodoDTO[] = req.body.todos;
  const userId: string = req.body.userId;

  try {
    const user = await User.findById(userId);

    checkData(user);

    todos.forEach((todo) => {
      const todoIndex = user.todos.findIndex(
        (el) => el._id.toString() === todo.id
      );

      user.todos[todoIndex].index = todo.index;
    });

    await user.save();
    res.status(200).json({ message: 'Todos order was updated.' });
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
    const user = await User.findById(userId);

    const deletedTodo = user.todos.find(
      (todo) => todo._id.toString() === todoId
    );

    user.todos.pull(todoId);

    user.todos.forEach((todo) => {
      const todoIndex = user.todos.findIndex((el) => el._id === todo._id);

      if (todo.index > deletedTodo.index) {
        user.todos[todoIndex].index--;
      }
    });

    await user.save();
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
    await User.updateOne(
      { _id: userId },
      { $pull: { todos: { checked: true } } }
    );

    const user = await User.findById(userId);

    user.todos.forEach((todo, index) => {
      user.todos[index].index = index;
    });

    await user.save();
    res.status(200).json({ message: 'Deleted completed todos.' });
  } catch (err) {
    handleError(err, next);
  }
};
