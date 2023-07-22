import { Todo } from '@todo-app/shared/domain';

export const changeTodoStatus = (todos: Todo[], id: string): Todo[] =>
  todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        checked: !todo.checked,
      };
    }
    return todo;
  });
