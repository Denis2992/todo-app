import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import * as authDataAccess from '@todo-react/auth/data-access';

describe('LoginForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginForm />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });

  describe('loginSubmit', () => {
    it('should login successfully', async () => {
      jest.spyOn(authDataAccess, 'loginUser').mockResolvedValueOnce({
        token: '123456',
        message: 'success',
        userId: 'testId',
        userName: 'testUser',
      });

      render(<LoginForm />, { wrapper: MemoryRouter });

      await act(async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: '1234566778' } });

        const submitBtn = screen.getByTestId('submit-btn');
        fireEvent.click(submitBtn);
      });

      expect(authDataAccess.loginUser).toHaveBeenCalled();
    });

    it('should not login and throw and display an error', async () => {
      jest.spyOn(authDataAccess, 'loginUser').mockRejectedValueOnce({
        message: 'Login error!',
      });

      render(<LoginForm />, { wrapper: MemoryRouter });

      await act(async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: '1234566778' } });

        const submitBtn = screen.getByTestId('submit-btn');
        fireEvent.click(submitBtn);
      });

      const errorMessage = screen.getByText('Login error!');

      expect(authDataAccess.loginUser).toHaveBeenCalled();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
