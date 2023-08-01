import { TodoDB } from '@todo-api/shared/domain';
import { Todo } from '@todo-app/shared/domain';

export const mapToTodoDTO = (todos: TodoDB[]): Todo[] => {
  return todos.map((todo) => ({
    title: todo.title,
    checked: todo.checked,
    id: todo._id.toString(),
    index: todo.index,
  }));
};
