import { Todo } from '@todo-app/shared/domain';
import * as todoApi from '../../api/todo-api/todo.api';
import * as todoLocalStorage from '../../local-storage-manager/todo-local-storage-manager';

export function getTodos(
  token: string | null
): Promise<{ message: string; todos: Todo[] }> {
  if (token) {
    return checkTodosInLocalStorage(token);
  }

  return new Promise((resolve) => {
    const todos = todoLocalStorage.getTodos();
    resolve({ message: 'Got from locale storage', todos });
  });
}

export async function checkTodosInLocalStorage(
  token: string | null
): Promise<{ message: string; todos: Todo[] }> {
  const todos = todoLocalStorage.getTodos();
  if (todos.length > 0) {
    const res = await todoApi.addManyTodos(token, todos);

    todoLocalStorage.clearTodos();

    return res;
  }

  return todoApi.getTodos(token);
}

export function addTodo(
  title: string,
  token: string | null
): Promise<{ message: string; todo: Todo }> {
  if (token) {
    return todoApi.addTodo(title, token);
  }

  return new Promise((resolve) => {
    const newTodo = todoLocalStorage.addTodo(title);
    resolve({ message: 'Added to local storage', todo: newTodo });
  });
}

export function updateTodoStatus(
  id: string,
  token: string | null
): Promise<{ message: string }> {
  if (token) {
    return todoApi.updateTodoStatus(id, token);
  }

  return new Promise((resolve) => {
    todoLocalStorage.updateTodo(id);
    resolve({ message: 'Updated in local storage.' });
  });
}

export function updateTodosOrder(
  token: string | null,
  todos: Todo[]
): Promise<{ message: string }> {
  if (token) {
    return todoApi.updateTodosOrder(token, todos);
  }

  return new Promise((resolve) => {
    todoLocalStorage.setTodos(todos);
    resolve({ message: 'Order was saved in local storage.' });
  });
}

export function deleteTodo(
  id: string,
  token: string | null
): Promise<{ message: string; todoId: string }> {
  if (token) {
    return todoApi.deleteTodo(id, token);
  }

  return new Promise((resolve) => {
    todoLocalStorage.deleteTodo(id);
    resolve({ message: 'Deleted in local storage.', todoId: id });
  });
}

export function deleteCompletedTodos(
  token: string | null
): Promise<{ message: string }> {
  if (token) {
    return todoApi.deleteCompletedTodos(token);
  }

  return new Promise((resolve) => {
    todoLocalStorage.deleteCompletedTodos();
    resolve({ message: 'Deleted todos in local storage.' });
  });
}
