import { ThemeProvider } from '@todo-react/shared-store';
import TodoMain from '../../components/todo-main/TodoMain';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TodoPage } from '@todo-react/todo-feature';
import { LoginPage, SignUpPage } from '@todo-react/auth-feature';

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
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
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
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default TodoApp;
