import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import HeaderComponent from './HeaderComponent';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import {
  AuthContext,
  AuthContextType,
  ThemeContext,
} from '@todo-react/shared/data-access';
import { ThemeType } from '@todo-react/shared/domain';

describe('Header', () => {
  it('should render successfully', () => {
    const { container } = render(<HeaderComponent />, {
      wrapper: MemoryRouter,
    });
    const loginIcon = screen.getByAltText('login');

    expect(container).toBeTruthy();
    expect(loginIcon).toBeInTheDocument();
  });

  it('should call changeTheme on theme icon click', () => {
    const changeThemeMock = jest.fn();
    render(
      <ThemeContext.Provider
        value={{ theme: ThemeType.LIGHT, changeTheme: changeThemeMock }}
      >
        <HeaderComponent />
      </ThemeContext.Provider>,
      {
        wrapper: MemoryRouter,
      }
    );

    const themeIcon = screen.getByAltText('check-theme-icon');
    fireEvent.click(themeIcon);

    expect(changeThemeMock).toHaveBeenCalled();
  });

  it('should render logout icon and hello message when user is log in', () => {
    const authContext: AuthContextType = {
      isAuth: true,
      token: null,
      userName: 'Anna',
      setUser: () => jest.fn(),
      clearUser: () => jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContext}>
        <HeaderComponent />
      </AuthContext.Provider>,
      {
        wrapper: MemoryRouter,
      }
    );

    const logoutIcon = screen.getByAltText('logout');
    const welcomeText = screen.getByText('Welcome, Anna!');

    expect(logoutIcon).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });
});
