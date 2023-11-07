import '@testing-library/jest-dom';

import {
  addTodo,
  clearTodos,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from './todo-local-storage-manager';
import { LocalStorageMock } from '@todo-react/todo/util'; // Replace with the actual module path

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

describe('Todo local storage manager', () => {
  beforeEach(() => {
    clearTodos();
  });

  describe('getTodos', () => {
    it('should return empty array when local storage is empty', () => {
      const result = getTodos();

      expect(result).toEqual([]);
    });

    it('should return array with todo', () => {
      addTodo('test1');

      const result = getTodos();
      expect(result[0].title).toEqual('test1');
      expect(result.length).toEqual(1);
    });
  });

  describe('updateTodo', () => {
    it('should change key checked on true and save', () => {
      addTodo('update');
      const todoId = getTodos()[0].id;

      updateTodo(todoId);

      const result = getTodos();

      expect(result[0].checked).toEqual(true);
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo from local storage', () => {
      addTodo('item1');
      addTodo('item2');

      const todoId = getTodos()[1].id;

      deleteTodo(todoId);

      const result = getTodos();

      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('item1');
    });
  });

  describe('deleteCompletedTodos', () => {
    it('should delete completed todos from local storage', () => {
      addTodo('item1');
      addTodo('item2');
      addTodo('item3');

      const todos = getTodos();

      updateTodo(todos[0].id);
      updateTodo(todos[1].id);
      deleteCompletedTodos();

      const result = getTodos();

      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('item3');
    });
  });
});
