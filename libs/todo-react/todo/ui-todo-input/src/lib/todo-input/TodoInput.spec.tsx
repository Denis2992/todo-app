import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoInput itemAdded={jest.fn()} />);
    expect(baseElement).toBeTruthy();
  });

  it('should create new todo', () => {
    const { getByRole, getByTestId } = render(
      <TodoInput itemAdded={jest.fn()} />
    );

    const input = getByRole('textbox');
    const addTodoButton = getByTestId('add-todo-btn');

    act(() => {
      fireEvent.input(input, { target: { value: 'test-todo' } });
    });

    waitFor(() => {
      fireEvent.submit(addTodoButton);
      expect(input).toHaveValue('test-todo');
    });
  });

  it('should display an error message when submitting an empty todo', async () => {
    const { getByTestId, findAllByRole } = render(
      <TodoInput itemAdded={jest.fn()} />
    );

    const submitButton = getByTestId('add-todo-btn');

    fireEvent.submit(submitButton);

    expect(await findAllByRole('alert')).toHaveLength(1);
  });
});
