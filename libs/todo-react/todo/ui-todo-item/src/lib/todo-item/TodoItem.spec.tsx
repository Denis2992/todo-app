import { fireEvent, render } from '@testing-library/react';

import TodoItem, { TodoItemProps } from './TodoItem';

const todoItemProps: TodoItemProps = {
  todo: {
    id: '123',
    title: 'test-todo',
    checked: false,
    index: 1,
  },
  index: 1,
  itemDeleted: jest.fn(),
  checkboxClicked: jest.fn(),
};

describe('TodoItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoItem {...todoItemProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call checkboxClicked property on checkbox click', () => {
    const { getByTestId } = render(<TodoItem {...todoItemProps} />);

    const checkbox = getByTestId('check-todo-btn');

    fireEvent.click(checkbox);

    expect(todoItemProps.checkboxClicked).toHaveBeenCalledWith('123');
  });

  it('should call itemDeleted property on delete todo', () => {
    const { getByTestId } = render(<TodoItem {...todoItemProps} />);

    const deleteBtn = getByTestId('delete-todo-btn');

    fireEvent.click(deleteBtn);

    expect(todoItemProps.itemDeleted).toHaveBeenCalledWith('123');
  });
});
