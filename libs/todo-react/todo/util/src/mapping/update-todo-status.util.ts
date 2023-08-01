import { Todo } from '@todo-app/shared/domain';

export const updateTodoStatus = (todos: Todo[], id: string): Todo[] =>
  todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        checked: !todo.checked,
      };
    }
    return todo;
  });
