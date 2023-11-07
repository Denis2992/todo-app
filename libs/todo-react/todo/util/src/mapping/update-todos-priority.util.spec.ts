import { Todo } from '@todo-app/shared/domain';
import { updateTodosPriority } from './update-todos-priority.util';

const todos: Todo[] = [
  {
    id: '123',
    title: 'active',
    checked: false,
    index: 0,
  },
  {
    id: '456',
    title: 'completed',
    checked: true,
    index: 1,
  },
  {
    id: '789',
    title: 'completed2',
    checked: true,
    index: 2,
  },
];

describe('updateTodosAfterDeleteMany', () => {
  it('should update todos priority when oldIndex greater newIndex', () => {
    const updatedTodos = updateTodosPriority(todos, '456', 1, 0);

    expect(updatedTodos[1].index).toEqual(0);
  });

  it('should update todos priority when newIndex greater oldIndex', () => {
    const updatedTodos = updateTodosPriority(todos, '123', 0, 1);

    expect(updatedTodos[0].index).toEqual(1);
  });
});
