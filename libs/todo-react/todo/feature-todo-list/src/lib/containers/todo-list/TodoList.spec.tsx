import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import TodoList, { TodoListProps } from './TodoList';
import { FilterType, Todo } from '@todo-app/shared/domain';

const mockedTodos: Todo[] = [
  {
    id: '123',
    title: 'active',
    checked: false,
    index: 1,
  },
  {
    id: '456',
    title: 'completed',
    checked: true,
    index: 2,
  },
];

const getListProps = (
  activeFilter: FilterType = FilterType.ALL
): TodoListProps => ({
  isMobile: false,
  todos: mockedTodos,
  activeFilter: activeFilter,
  todoOrderChanged: false,
  itemDeleted: jest.fn(),
  checkboxClicked: jest.fn(),
  filterChanged: jest.fn(),
  onDragEnd: jest.fn(),
  clearedCompletedTodos: jest.fn(),
  todoOrderSaved: jest.fn(),
});

describe('TodoList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoList {...getListProps()} />);
    expect(baseElement).toBeTruthy();
  });

  describe('filteredTodos', () => {
    it('should return active todos', () => {
      const { getByText } = render(
        <TodoList {...getListProps(FilterType.ACTIVE)} />
      );

      const filteredTodo = getByText('active');

      expect(filteredTodo).toBeInTheDocument();
    });

    it('should return completed todos', () => {
      const { getByText } = render(
        <TodoList {...getListProps(FilterType.COMPLETED)} />
      );

      const filteredTodo = getByText('completed');
      expect(filteredTodo).toBeInTheDocument();
    });
  });

  it('should call checkboxClicked property on checkbox click', () => {
    const todoListProps: TodoListProps = {
      ...getListProps(),
      todos: [mockedTodos[0]],
    };
    render(<TodoList {...todoListProps} />);

    const checkTodoCheckbox = screen.getByTestId('check-todo-btn');

    fireEvent.click(checkTodoCheckbox);

    expect(todoListProps.checkboxClicked).toHaveBeenCalled();
  });

  it('should call itemDeleted property on item delete click', () => {
    const todoListProps: TodoListProps = {
      ...getListProps(),
      todos: [mockedTodos[0]],
    };
    render(<TodoList {...todoListProps} />);

    const deleteTodoBtn = screen.getByTestId('delete-todo-btn');

    fireEvent.click(deleteTodoBtn);

    expect(todoListProps.itemDeleted).toHaveBeenCalled();
  });

  it('should call todoOrderSaved property on todos order save click', () => {
    const todoListProps: TodoListProps = {
      ...getListProps(),
      todoOrderChanged: true,
    };
    render(<TodoList {...todoListProps} />);

    const saveTodoBtn = screen.getByText('Save the changes');
    fireEvent.click(saveTodoBtn);

    expect(todoListProps.todoOrderSaved).toHaveBeenCalled();
  });

  it('should call filterChanged property on filter change', () => {
    const todoListProps: TodoListProps = {
      ...getListProps(),
    };
    render(<TodoList {...todoListProps} />);

    const completedFilterBtn = screen.getByText('Completed');
    fireEvent.click(completedFilterBtn);

    expect(todoListProps.filterChanged).toHaveBeenCalled();
  });

  it('should call clearedCompletedTodos property on clear completed todos', () => {
    const todoListProps: TodoListProps = {
      ...getListProps(),
    };
    render(<TodoList {...todoListProps} />);

    const clearCompletedBtn = screen.getByText('Clear Completed');
    fireEvent.click(clearCompletedBtn);

    expect(todoListProps.clearedCompletedTodos).toHaveBeenCalled();
  });
});
