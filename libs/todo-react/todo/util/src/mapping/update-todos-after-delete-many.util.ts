import { Todo } from '@todo-app/shared/domain';

export const updateTodosAfterDeleteMany = (todos: Todo[]) => {
  return todos
    .filter((todo) => !todo.checked)
    .map((todo, index) => {
      return {
        ...todo,
        index,
      };
    });
};
