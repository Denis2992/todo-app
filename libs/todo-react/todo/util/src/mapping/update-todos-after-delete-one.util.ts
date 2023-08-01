import { Todo } from '@todo-app/shared/domain';

export const updateTodosAfterDeleteOne = (
  todos: Todo[],
  deletedTodoId: string
): Todo[] => {
  return todos
    .filter((todo) => todo.id !== deletedTodoId)
    .map((todo, index) => {
      return {
        ...todo,
        index,
      };
    });
};
