import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TodoMain from '../../components/todo-main/TodoMain';
import { TodoPage } from '@todo-react/todo/feature';
import {
  AuthPage,
  LoginForm,
  SignUpForm,
} from '@todo-app/todo-react/auth/feature';
import { AuthProvider, ThemeProvider } from '@todo-react/shared/data-access';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <TodoMain />,
    children: [
      {
        path: '',
        element: <TodoPage />,
      },
      {
        path: 'login',
        element: <AuthPage children={<LoginForm />} />,
      },
      {
        path: 'sign-up',
        element: <AuthPage children={<SignUpForm />} />,
      },
      {
        path: '*',
        element: <p>Page not found</p>,
      },
    ],
  },
]);

export function TodoApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default TodoApp;
