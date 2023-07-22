import { Todo } from '@todo-app/shared/domain';
import * as todoApi from '../api/todo.api';
import * as todoLocalStorage from '../local-storage-manager/todo-local-storage-manager';

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

export function updateTodo(
  id: string,
  token: string | null
): Promise<{ message: string }> {
  if (token) {
    return todoApi.updateTodo(id, token);
  }

  return new Promise((resolve) => {
    todoLocalStorage.updateTodo(id);
    resolve({ message: 'Updated in local storage.' });
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

export function deleteComplitedTodos(
  token: string | null
): Promise<{ message: string }> {
  if (token) {
    return todoApi.deleteComplitedTodos(token);
  }

  return new Promise((resolve) => {
    todoLocalStorage.deleteCompletedTodos();
    resolve({ message: 'Deleted todos in local storage.' });
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
