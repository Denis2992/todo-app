import '@testing-library/jest-dom';

import { LocalStorageMock } from '@todo-react/todo/util';
import {
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  updateTodosOrder,
  updateTodoStatus,
} from './todo-data-access';
import * as todoLocalStorage from '../../local-storage-manager/todo-local-storage-manager';
import * as todoApi from '../../api/todo-api/todo.api';
import { Todo } from '@todo-app/shared/domain';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

jest.mock('../../api/todo-api/todo.api');

describe('todo data access', () => {
  const token = 'test-token';

  beforeEach(() => {
    todoLocalStorage.clearTodos();
  });

  describe('getTodos', () => {
    it('should return data from database when user is logged in', async () => {
      jest.spyOn(todoApi, 'addManyTodos');
      jest.spyOn(todoApi, 'getTodos');

      await getTodos(token);

      expect(todoApi.addManyTodos).not.toHaveBeenCalled();
      expect(todoApi.getTodos).toHaveBeenCalled();
    });

    it('should add todos from local storage and return data from database when user is logged in', async () => {
      jest.spyOn(todoApi, 'addManyTodos');
      jest.spyOn(todoApi, 'getTodos');
      todoLocalStorage.addTodo('test1');

      await getTodos(token);

      expect(todoApi.addManyTodos).toHaveBeenCalled();
      expect(todoApi.getTodos).toHaveBeenCalled();
    });

    it('should return data from local storage when user is not logged in', async () => {
      todoLocalStorage.addTodo('test1');
      const result = await getTodos(null);

      expect(result.message).toBe('Got from locale storage');
      expect(result.todos.length).toEqual(1);
    });
  });

  describe('addTodo', () => {
    it('should add todo to database when user is logged in', () => {
      jest.spyOn(todoApi, 'addTodo');

      addTodo('test', token);

      expect(todoApi.addTodo).toHaveBeenCalled();
    });

    it('should add todo to local storage when user is not logged in', () => {
      jest.spyOn(todoLocalStorage, 'addTodo');

      addTodo('test', null);

      expect(todoLocalStorage.addTodo).toHaveBeenCalled();
      expect(todoLocalStorage.getTodos().length).toEqual(1);
    });
  });

  describe('updateTodoStatus', () => {
    it('should update todo in database when user is logged in', () => {
      jest.spyOn(todoApi, 'updateTodoStatus');

      updateTodoStatus('12345', token);

      expect(todoApi.updateTodoStatus).toHaveBeenCalled();
    });

    it('should update todo in local storage when user is not logged in', () => {
      jest.spyOn(todoLocalStorage, 'updateTodo');

      updateTodoStatus('12345', null);

      expect(todoLocalStorage.updateTodo).toHaveBeenCalled();
    });
  });

  describe('updateTodosOrder', () => {
    it('should update todos order in database when user is logged in', () => {
      jest.spyOn(todoApi, 'updateTodosOrder');

      updateTodosOrder(token, [{} as Todo]);

      expect(todoApi.updateTodosOrder).toHaveBeenCalled();
    });

    it('should update todos order in local storage when user is not logged in', () => {
      jest.spyOn(todoLocalStorage, 'setTodos');

      updateTodosOrder(null, [{} as Todo]);

      expect(todoLocalStorage.setTodos).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo from database when user is logged in', () => {
      jest.spyOn(todoApi, 'deleteTodo');

      deleteTodo('12345', token);

      expect(todoApi.deleteTodo).toHaveBeenCalled();
    });

    it('should delete todo from local storage when user is not logged in', () => {
      jest.spyOn(todoLocalStorage, 'deleteTodo');

      deleteTodo('12345', null);

      expect(todoLocalStorage.deleteTodo).toHaveBeenCalled();
    });
  });

  describe('deleteCompletedTodos', () => {
    it('should delete completed todos from database when user is logged in', () => {
      jest.spyOn(todoApi, 'deleteCompletedTodos');

      deleteCompletedTodos(token);

      expect(todoApi.deleteTodo).toHaveBeenCalled();
    });

    it('should delete completed todos from local storage when user is not logged in', () => {
      jest.spyOn(todoLocalStorage, 'deleteCompletedTodos');

      deleteCompletedTodos(null);

      expect(todoLocalStorage.deleteCompletedTodos).toHaveBeenCalled();
    });
  });
});
