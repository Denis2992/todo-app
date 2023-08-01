import { Router } from 'express';
import { body } from 'express-validator';

import * as todoController from '../controllers/todo-controller';
import { isAuth } from '@todo-api/shared/util';

export const todoRouter = Router();

todoRouter.get('/todo', isAuth, todoController.getTodos);

todoRouter.post(
  '/todo',
  isAuth,
  [body('title').trim().isLength({ min: 6 })],
  todoController.addTodo
);

todoRouter.post(
  '/todo/add-many',
  [body('todos').isLength({ min: 1 })],
  isAuth,
  todoController.addManyTodos
);

todoRouter.delete(
  '/todo/delete-completed',
  isAuth,
  todoController.deleteCompletedTodos
);

todoRouter.put('/todo/update-order', isAuth, todoController.updateTodosOrder);

todoRouter.put('/todo/:todoId', isAuth, todoController.updateTodoStatus);

todoRouter.delete('/todo/:todoId', isAuth, todoController.deleteTodo);
