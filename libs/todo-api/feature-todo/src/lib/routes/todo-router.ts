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

todoRouter.put(
  '/todo/delete-completed',
  isAuth,
  todoController.deleteCompletedTodos
);

todoRouter.put('/todo/:todoId', isAuth, todoController.updateTodo);

todoRouter.delete('/todo/:todoId', isAuth, todoController.deleteTodo);
