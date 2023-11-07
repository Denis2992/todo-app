import { User } from '@todo-api/shared/domain';
import * as authController from './auth-controller';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('Auth Controllers', () => {
  describe('signUp', () => {
    it('should create new user and set response', async () => {
      jest.spyOn(User.prototype, 'save').mockReturnValue({
        _id: 12345,
        name: 'tester',
      });

      const req = {
        body: {
          email: 'test@test.com',
          password: 'password',
          name: 'tester',
        },
      } as Request;

      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      } as unknown as Response;

      await authController.signUp(req, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created!',
        userId: 12345,
        userName: 'tester',
      });
    });
  });

  describe('login', () => {
    it('should throw an error with code 401 if user was not found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(null));

      const req = {
        body: {},
      } as Request;

      await authController.login(req, {} as Response, (error) => {
        expect(error.status).toBe(401);
      });
    });

    it('should throw an error with code 401 if password is not correct', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(
        Promise.resolve({
          email: 'test@test.com',
          password: 'tester2',
        })
      );

      const req = {
        body: {
          email: 'test@test.com',
          password: 'tester',
        },
      } as Request;

      await authController.login(req, {} as Response, (error) => {
        expect(error.status).toBe(401);
      });
    });

    it('should throw an error with code 500 if accessing the database fails', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(() => 'error');

      const req = {
        body: {
          email: 'test@test.com',
          password: 'tester',
        },
      } as Request;

      await authController.login(req, {} as Response, (error) => {
        expect(error.status).toBe(500);
      });
    });

    it('should login successfully', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({
        email: 'test@test.com',
        password: `${bcrypt.hash('tester', 10)}`,
        name: 'test',
        _id: 1234567,
      });

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'token');

      const req = {
        body: {
          email: 'test@test.com',
          password: 'tester',
        },
      } as Request;

      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      } as unknown as Response;

      await authController.login(req, res as Response, jest.fn());

      expect(jwt.sign).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login succeed',
        token: 'token',
        userId: '1234567',
        userName: 'test',
      });
    });
  });
});
