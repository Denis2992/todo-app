import { User } from '@todo-api/shared/domain';
import { Request, Response } from 'express';
import * as todoController from './todo-controller';
import * as helpers from '../helpers/prepare-todo-index.helper';
import { prepareTodoIndex } from '../helpers/prepare-todo-index.helper';
import * as bcrypt from 'bcrypt';

const userMock = new User({
  email: 'test@test.com',
  password: 'testPassword',
  name: 'test',
  todos: [
    {
      checked: false,
      title: 'new',
      index: 0,
    },
    {
      checked: true,
      title: 'another todo',
      index: 1,
    },
  ],
});

const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('Todo Controllers', () => {
  describe('getTodos', () => {
    it('should throw an error with code 401 if user was not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValueOnce(
        Promise.reject({
          status: 404,
        })
      );

      const req = {
        body: {},
      } as Request;

      await todoController.getTodos(req, {} as Response, (error) => {
        expect(error.status).toBe(404);
      });
    });

    it('should return all todos when user was found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({
        email: 'test@test.com',
        name: 'test',
        _id: 1234567,
        todos: [
          {
            title: 'new',
            index: 0,
            _id: 12345,
            checked: false,
          },
        ],
      });

      const req = {
        body: {},
      } as Request;

      const res = responseMock;

      await todoController.getTodos(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todos were fetched successfully.',
        todos: [
          {
            checked: false,
            id: 12345,
            index: 0,
            title: 'new',
          },
        ],
      });
    });
  });

  describe('addTodo', () => {
    it('should add new todo item to database', async () => {
      jest
        .spyOn(helpers, 'prepareTodoIndex')
        .mockResolvedValue(Promise.resolve(1));

      jest.spyOn(User, 'updateOne').mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      });

      const req = {
        body: {
          userId: 'test-id',
          title: 'new',
        },
      } as Request;

      const res = responseMock;

      await todoController.addTodo(req, res, jest.fn());

      expect(prepareTodoIndex).toHaveBeenCalledWith('test-id');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('addManyTodos', () => {
    it('should add new todo items to database', async () => {
      jest
        .spyOn(helpers, 'prepareTodoIndex')
        .mockResolvedValue(Promise.resolve(0));

      jest.spyOn(User, 'updateOne').mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      });

      jest.spyOn(User, 'findById').mockResolvedValue({
        email: 'test@test.com',
        password: `${bcrypt.hash('tester', 10)}`,
        name: 'test',
        _id: 1234567,
        todos: [
          {
            checked: false,
            title: 'new',
            _id: 1111,
            index: 2,
          },
          {
            checked: true,
            title: 'another todo',
            _id: 2222,
            index: 1,
          },
        ],
      });

      const req = {
        body: {
          userId: 'test-id',
          todos: [
            {
              checked: false,
              title: 'new',
            },
            {
              checked: true,
              title: 'another todo',
            },
          ],
        },
      } as Request;

      const res = responseMock;

      await todoController.addManyTodos(req, res, jest.fn());

      expect(prepareTodoIndex).toHaveBeenCalledWith('test-id');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todos were created successfully!',
        todos: [
          { checked: false, title: 'new', id: 1111, index: 2 },
          { checked: true, title: 'another todo', id: 2222, index: 1 },
        ],
      });
    });
  });

  describe('updateTodoStatus', () => {
    it('should update todo item status successfully', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(userMock);
      jest.spyOn(User, 'updateOne').mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      });

      const req = {
        body: {
          userId: 'test-id',
        },
        params: {
          todoId: userMock.todos[0].id,
        },
      } as unknown as Request;

      const res = responseMock;

      await todoController.updateTodoStatus(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todo was updated.',
      });
    });
  });

  describe('updateTodosOrder', () => {
    it('should throw an error when user is not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(Promise.resolve(null));

      const req = {
        body: {},
      } as Request;

      await todoController.updateTodosOrder(req, {} as Response, (error) => {
        expect(error.status).toBe(500);
      });
    });

    it('should update todo items order successfully', async () => {
      const findByIdMock = jest
        .spyOn(User, 'findById')
        .mockResolvedValue(userMock);
      userMock.save = jest.fn();

      const req = {
        body: {
          userId: 'test-id',
          todos: [
            {
              checked: false,
              title: 'new',
              index: 1,
            },
            {
              checked: true,
              title: 'another todo',
              index: 0,
            },
          ],
        },
      } as Request;

      const res = responseMock;

      await todoController.updateTodosOrder(req, res, jest.fn());

      expect(findByIdMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo item successfully', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(userMock);
      userMock.save = jest.fn();
      const deletedTodoId = userMock.todos[0].id;

      const req = {
        body: {
          userId: deletedTodoId.id,
        },
        params: {
          todoId: deletedTodoId,
        },
      } as unknown as Request;

      const res = responseMock;

      await todoController.deleteTodo(req, res, (err) => {
        expect(err.status).toEqual(500);
      });

      expect(userMock.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todo was deleted.',
        todoId: deletedTodoId,
      });
    });
  });

  describe('deleteCompletedTodos', () => {
    it('should delete completed todos successfully', async () => {
      jest.spyOn(User, 'updateOne').mockImplementation();
      jest.spyOn(User, 'findById').mockResolvedValue(userMock);
      userMock.save = jest.fn();

      const req = {
        body: {
          userId: userMock.id,
        },
      } as Request;
      const res = responseMock;

      await todoController.deleteCompletedTodos(req, res, jest.fn());

      expect(User.updateOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Completed todos were deleted.',
      });
    });
  });
});
