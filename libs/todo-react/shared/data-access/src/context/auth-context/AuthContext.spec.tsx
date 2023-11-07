import { fireEvent, render } from '@testing-library/react';

import { AuthContext, AuthProvider } from './AuthContext';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AuthContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthProvider children={<div />} />);
    expect(baseElement).toBeTruthy();
  });

  it('sets user data in localStorage when setUser is called', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ setUser }) => (
            <button onClick={() => setUser('testToken', 'testUser')}>
              Set User
            </button>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const setUserButton = getByText('Set User');
    fireEvent.click(setUserButton);

    expect(localStorage.getItem('token')).toBe('testToken');
    expect(localStorage.getItem('userName')).toBe('testUser');
  });

  it('clears user data from localStorage when clearUser is called', () => {
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('userName', 'testUser');

    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ clearUser }) => <button onClick={clearUser}>Clear User</button>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const clearUserButton = getByText('Clear User');
    fireEvent.click(clearUserButton);

    expect(localStorage.getItem('token')).toBe(undefined);
    expect(localStorage.getItem('userName')).toBe(undefined);
  });
});
