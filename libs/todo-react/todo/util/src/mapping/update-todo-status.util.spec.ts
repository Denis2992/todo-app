import { Todo } from '@todo-app/shared/domain';
import { updateTodoStatus } from './update-todo-status.util';

describe('updateTodoStatus', () => {
  it('should update todo key checked', () => {
    const todos: Todo[] = [
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

    const updatedTodoStatus = updateTodoStatus(todos, '123')[0].checked;

    expect(updatedTodoStatus).toEqual(true);
  });
});
