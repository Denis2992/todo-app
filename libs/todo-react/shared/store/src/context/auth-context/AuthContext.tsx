import { AuthContextState, sessionTimeout } from '@todo-react/shared/domain';
import { createContext, useEffect, useState } from 'react';

export type AuthContextType = {
  isAuth: boolean;
  token: string | null;
  userName: string | null;
  setUser: (token: string, userName: string) => void;
  clearUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  token: null,
  userName: null,
  /*eslint-disable @typescript-eslint/no-empty-function */
  setUser: () => {},
  clearUser: () => {},
  /*eslint-enable @typescript-eslint/no-empty-function */
});

const authInitialState: AuthContextState = {
  isAuth: false,
  token: null,
  userName: null,
};

export interface AuthContextProps {
  children: JSX.Element;
}

export function AuthProvider(props: AuthContextProps) {
  const [authData, setAuthData] = useState<AuthContextState>(authInitialState);
  const [sessionTime, setSessionTime] = useState<number | null>(null);

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    let sessionTimer: ReturnType<typeof setTimeout>;

    if (sessionTime) {
      sessionTimer = setTimeout(() => {
        clearUser();
      }, sessionTime);
    }

    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [sessionTime]);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      clearUser();
      return;
    }
    const userName = localStorage.getItem('userName');
    const remainingSessionTime =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAuthData({ isAuth: true, token, userName });
    setSessionTime(remainingSessionTime);
  };

  const setUser = (token: string, userName: string) => {
    setAuthData({ isAuth: true, token, userName });
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    const expiryDate = new Date(new Date().getTime() + sessionTimeout);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    setSessionTime(sessionTimeout);
  };

  const clearUser = () => {
    setAuthData(authInitialState);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('expiryDate');
    setSessionTime(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authData,
        setUser,
        clearUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
