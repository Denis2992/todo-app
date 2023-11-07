import { loginUser, signupUser } from './auth-data-access';
import { LoginPayload, SignupPayload } from '@todo-app/shared/domain';

global.fetch = jest.fn();

const loginPayload: LoginPayload = {
  email: 'test@test.com',
  password: 'test123',
};

const signUpPayload: SignupPayload = {
  ...loginPayload,
  name: 'testUser',
  confirmPassword: 'test123',
};

describe('auth API functions', () => {
  const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const mockResponse = {
        status: 200,
        json: async () => ({
          message: 'Success',
          token: 'token',
          userId: '321userId',
          userName: 'testUser',
        }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await loginUser(loginPayload);

      expect(result.message).toBe('Success');
      expect(result.userName).toBe('testUser');
    });

    it('should throw error when password or login are wrong', async () => {
      const mockResponse = {
        status: 401,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await loginUser(loginPayload);
      };

      await expect(result).rejects.toThrow('Wrong email or password');
    });

    it('should throw error response has status 404', async () => {
      const mockResponse = {
        status: 404,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await loginUser(loginPayload);
      };

      await expect(result).rejects.toThrow(
        'Something went wrong! Please try again.'
      );
    });
  });

  describe('signupUser', () => {
    it('should sign up new user successfully', async () => {
      const mockResponse = {
        status: 201,
        json: async () => ({
          message: 'Success',
          userId: '321userId',
          userName: 'testUser',
        }),
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = await signupUser(signUpPayload);

      expect(result.message).toBe('Success');
      expect(result.userName).toBe('testUser');
    });

    it('should throw error validation failed', async () => {
      const mockResponse = {
        status: 422,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await signupUser(signUpPayload);
      };

      await expect(result).rejects.toThrow(
        "Validation failed. Make sure the email address isn't used yet!"
      );
    });

    it('should throw error response has status 404', async () => {
      const mockResponse = {
        status: 404,
      };
      const mockResponsePromise = Promise.resolve(mockResponse);
      fetchMock.mockResolvedValueOnce(mockResponsePromise as Promise<Response>);

      const result = async () => {
        await signupUser(signUpPayload);
      };

      await expect(result).rejects.toThrow(
        'Something went wrong! Please try again.'
      );
    });
  });
});
