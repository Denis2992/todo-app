import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import React from 'react';
import { AuthContext, AuthContextType } from '@todo-react/shared/data-access';
import { Todo } from '@todo-app/shared/domain';
import { todoDataAccess } from '@todo-react/todo/data-access';
import TodoPage from './TodoPage';

jest.mock('@todo-react/todo/data-access');

const mockedTodos: Todo[] = [
  {
    id: '123',
    title: 'test-todo',
    checked: false,
    index: 1,
  },
  {
    id: '456',
    title: 'another-todo',
    checked: true,
    index: 2,
  },
];

const getTodosMock = (todos: Todo[] | []) =>
  jest.spyOn(todoDataAccess, 'getTodos').mockResolvedValueOnce({
    message: 'Success',
    todos,
  });

const authContextMock: AuthContextType = {
  isAuth: true,
  token: '1234',
  userName: null,
  setUser: jest.fn(),
  clearUser: jest.fn(),
};

const TestAuthProvider = (props: { children: React.ReactNode }) => (
  <AuthContext.Provider value={authContextMock}>
    {props.children}
  </AuthContext.Provider>
);

describe('TodoPage', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

  it('should render successfully', async () => {
    getTodosMock([]);

    await act(async () => {
      render(<TodoPage />);
    });

    expect(screen.getByText('There is no todo yet')).toBeInTheDocument();
  });

  describe('useEffect', () => {
    it('should fetches and displays todos on mount', async () => {
      getTodosMock(mockedTodos);

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      expect(screen.getByText('test-todo')).toBeInTheDocument();
      expect(screen.getByText('another-todo')).toBeInTheDocument();
    });

    it('should throw and displays error on mount', async () => {
      jest.spyOn(todoDataAccess, 'getTodos').mockRejectedValueOnce({
        message: 'Error!',
      });
      jest.useFakeTimers();

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      expect(screen.getByText('Error!')).toBeInTheDocument();
    });
  });

  describe('onItemAdd', () => {
    it('should add todo to database successfully', async () => {
      getTodosMock([]);
      jest.spyOn(todoDataAccess, 'addTodo').mockResolvedValueOnce({
        message: 'Success',
        todo: mockedTodos[0],
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const input = screen.getByPlaceholderText('Create a new todo…');
      fireEvent.change(input, { target: { value: 'test-todo' } });

      const addTodoButton = screen.getByTestId('add-todo-btn');
      fireEvent.submit(addTodoButton);

      await waitFor(() => {
        expect(todoDataAccess.addTodo).toHaveBeenCalled();
        expect(screen.getByText('test-todo')).toBeInTheDocument();
      });
    });

    it('should throw an error on add todo to database', async () => {
      getTodosMock([]);
      jest.spyOn(todoDataAccess, 'addTodo').mockRejectedValueOnce({
        message: 'Error!',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const input = screen.getByPlaceholderText('Create a new todo…');
      fireEvent.change(input, { target: { value: 'test-todo' } });

      const addTodoButton = screen.getByTestId('add-todo-btn');
      fireEvent.submit(addTodoButton);

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });
    });
  });

  describe('onCheckboxClick', () => {
    it('should update todo in database successfully', async () => {
      getTodosMock([mockedTodos[0]]);
      jest.spyOn(todoDataAccess, 'updateTodoStatus').mockResolvedValueOnce({
        message: 'Todo Updated',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('check-todo-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(todoDataAccess.updateTodoStatus).toHaveBeenCalled();
      });
    });

    it('should throw an error on update todo status', async () => {
      getTodosMock([mockedTodos[0]]);
      jest.spyOn(todoDataAccess, 'updateTodoStatus').mockRejectedValueOnce({
        message: 'Error!',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('check-todo-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });
    });
  });

  describe('onItemDelete', () => {
    it('should delete todo from database successfully', async () => {
      getTodosMock([mockedTodos[0]]);
      jest.spyOn(todoDataAccess, 'deleteTodo').mockResolvedValueOnce({
        message: 'Deleted',
        todoId: mockedTodos[0].id,
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('delete-todo-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(todoDataAccess.deleteTodo).toHaveBeenCalled();
      });
    });

    it('should throw an error on delete todo', async () => {
      getTodosMock([mockedTodos[0]]);
      jest.spyOn(todoDataAccess, 'deleteTodo').mockRejectedValueOnce({
        message: 'Error!',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('delete-todo-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });
    });
  });

  describe('onClearCompletedTodos', () => {
    it('should delete completed todos from database successfully', async () => {
      getTodosMock(mockedTodos);
      jest.spyOn(todoDataAccess, 'deleteCompletedTodos').mockResolvedValueOnce({
        message: 'Todos updated',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('delete-completed-todos-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(todoDataAccess.deleteTodo).toHaveBeenCalled();
      });
    });

    it('should throw an error on complete todos delete', async () => {
      getTodosMock(mockedTodos);
      jest.spyOn(todoDataAccess, 'deleteCompletedTodos').mockRejectedValueOnce({
        message: 'Error!',
      });

      await act(async () => {
        render(<TodoPage />, { wrapper: TestAuthProvider });
      });

      const checkbox = screen.getByTestId('delete-completed-todos-btn');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });
    });
  });
});
