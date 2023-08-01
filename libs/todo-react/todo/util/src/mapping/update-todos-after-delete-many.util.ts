import { Todo } from '@todo-app/shared/domain';

export const updateTodosAfterDeleteMany = (todos: Todo[]) => {
  return todos
    .filter((todo) => todo.checked !== true)
    .map((todo, index) => {
      return {
        ...todo,
        index,
      };
    });
};
