import { Todo } from '@todo-app/shared/domain';
import { updateTodosAfterDeleteMany } from './update-todos-after-delete-many.util';

describe('updateTodosAfterDeleteMany', () => {
  it('should update todos after delete many', () => {
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
      {
        id: '789',
        title: 'completed2',
        checked: true,
        index: 3,
      },
    ];

    const updatedTodos = updateTodosAfterDeleteMany(todos);

    expect(updatedTodos).toHaveLength(1);
  });
});
