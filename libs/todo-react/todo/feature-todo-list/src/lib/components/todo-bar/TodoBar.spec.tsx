import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import TodoBar, { TodoBarProps } from './TodoBar';
import { ThemeType } from '@todo-react/shared/domain';
import { FilterType } from '@todo-app/shared/domain';

const barProps: TodoBarProps = {
  todosLeft: 3,
  theme: ThemeType.LIGHT,
  activeFilter: FilterType.ALL,
  isMobile: false,
  filterChanged: jest.fn(),
  clearedCompletedTodos: jest.fn(),
};

describe('TodoBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoBar {...barProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call filterChanged property on filter change', () => {
    render(<TodoBar {...barProps} />);

    const showActiveTodosBtn = screen.getByText('Active');

    fireEvent.click(showActiveTodosBtn);

    expect(barProps.filterChanged).toHaveBeenCalled();
  });

  it('should call onClearCompletedTodos property on clear button click', () => {
    render(<TodoBar {...barProps} />);

    const clearActiveTodosBtn = screen.getByTestId(
      'delete-completed-todos-btn'
    );

    fireEvent.click(clearActiveTodosBtn);

    expect(barProps.clearedCompletedTodos).toHaveBeenCalled();
  });
});
