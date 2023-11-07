import '@testing-library/jest-dom';
import { Todo } from '@todo-app/shared/domain';
import {
  addManyTodos,
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  updateTodosOrder,
  updateTodoStatus,
} from './todo.api';

global.fetch = jest.fn();

const todos: Todo[] = [
  {
    id: '123',
    title: 'test1',
    checked: false,
    index: 1,
  },
  {
    id: '456',
    title: 'test2',
    checked: true,
    index: 2,
  },
];

describe('todo API functions', () => {
  const token = 'test-token';
  const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTodos', () => {
    it('should get todos successfully', async () => {
      const mockResponse = {
        status: 200,
        json: async () => ({ message: 'Success', todos }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await getTodos(token);

      expect(result.message).toBe('Success');
      expect(result.todos).toEqual(todos);
    });

    it('should throw an error', () => {
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await getTodos(token);
      };

      expect(result).rejects.toThrow('Failed to fetch todos.');
    });
  });

  describe('addTodo', () => {
    it('should add todo to database successfully', async () => {
      const todo = todos[0];
      const mockResponse = {
        status: 201,
        json: async () => ({ message: 'Added', todo }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await addTodo(token, todo.title);

      expect(result.message).toBe('Added');
      expect(result.todo).toEqual(todo);
    });

    it('should throw an error', () => {
      const todo = todos[0];
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await addTodo(token, todo.title);
      };

      expect(result).rejects.toThrow('Creating a todo failed!');
    });
  });

  describe('addManyTodos', () => {
    it('should add many todos to database successfully', async () => {
      const mockResponse = {
        status: 201,
        json: async () => ({ message: 'Added todos', todos }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await addManyTodos(token, todos);

      expect(result.message).toBe('Added todos');
      expect(result.todos).toEqual(todos);
    });

    it('should throw an error', () => {
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await addManyTodos(token, todos);
      };

      expect(result).rejects.toThrow('Creating a todos failed!');
    });
  });

  describe('updateTodoStatus', () => {
    it('should update todo status successfully', async () => {
      const todo = todos[0];
      const mockResponse = {
        status: 200,
        json: async () => ({ message: 'Updated' }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await updateTodoStatus(token, todo.id);

      expect(result.message).toBe('Updated');
    });

    it('should throw an error', () => {
      const todo = todos[0];
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await updateTodoStatus(token, todo.id);
      };

      expect(result).rejects.toThrow('Updating a todo failed!');
    });
  });

  describe('updateTodosOrder', () => {
    it('should update todos order successfully', async () => {
      const mockResponse = {
        status: 200,
        json: async () => ({ message: 'Todos order updated!' }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await updateTodosOrder(token, todos);

      expect(result.message).toBe('Todos order updated!');
    });

    it('should throw an error', () => {
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await updateTodosOrder(token, todos);
      };

      expect(result).rejects.toThrow('Saving todos order failed!');
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo successfully', async () => {
      const todoId = '789';
      const mockResponse = {
        status: 200,
        json: async () => ({ message: 'Deleted successfully!', todoId }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await deleteTodo(token, todoId);

      expect(result.message).toBe('Deleted successfully!');
    });

    it('should throw an error', () => {
      const todoId = '789';
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await deleteTodo(token, todoId);
      };

      expect(result).rejects.toThrow('Deleting a todo failed!');
    });
  });

  describe('deleteCompletedTodos', () => {
    it('should delete completed todos successfully', async () => {
      const mockResponse = {
        status: 200,
        json: async () => ({ message: 'Todos order updated!' }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await deleteCompletedTodos(token);

      expect(result.message).toBe('Todos order updated!');
    });

    it('should throw an error', () => {
      const mockResponse = {
        status: 500,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await deleteCompletedTodos(token);
      };

      expect(result).rejects.toThrow('Deleting completed todos failed!');
    });
  });
});
