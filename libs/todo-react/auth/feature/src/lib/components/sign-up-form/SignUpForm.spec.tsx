import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import SignUpForm from './SignUpForm';
import { MemoryRouter } from 'react-router-dom';
import * as authDataAccess from '@todo-react/auth/data-access';

describe('SignUpForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpForm />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });

  describe('loginSubmit', () => {
    it('should login successfully', async () => {
      jest.spyOn(authDataAccess, 'signupUser').mockResolvedValueOnce({
        message: 'success',
        userId: 'testId',
        userName: 'testUser',
      });

      render(<SignUpForm />, { wrapper: MemoryRouter });

      await act(async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        const nameInput = screen.getByPlaceholderText('Name');
        fireEvent.change(nameInput, { target: { value: 'Denis' } });

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, {
          target: { value: 'TestPassword1+' },
        });

        const confirmPasswordInput =
          screen.getByPlaceholderText('Repeat password');
        fireEvent.change(confirmPasswordInput, {
          target: { value: 'TestPassword1+' },
        });

        const submitBtn = screen.getByTestId('submit-btn');
        fireEvent.click(submitBtn);
      });

      expect(authDataAccess.signupUser).toHaveBeenCalled();
    });

    it('should not login and throw and display an error', async () => {
      jest.spyOn(authDataAccess, 'signupUser').mockRejectedValueOnce({
        message: 'Sign up error!',
      });

      render(<SignUpForm />, { wrapper: MemoryRouter });

      await act(async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        const nameInput = screen.getByPlaceholderText('Name');
        fireEvent.change(nameInput, { target: { value: 'Denis' } });

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, {
          target: { value: 'TestPassword1+' },
        });

        const confirmPasswordInput =
          screen.getByPlaceholderText('Repeat password');
        fireEvent.change(confirmPasswordInput, {
          target: { value: 'TestPassword1+' },
        });

        const submitBtn = screen.getByTestId('submit-btn');
        fireEvent.click(submitBtn);
      });

      const errorMessage = screen.getByText('Sign up error!');

      expect(authDataAccess.signupUser).toHaveBeenCalled();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
