import uniqid from 'uniqid';

import { changeTodoStatus } from '@todo-react/todo/util';
import { Todo } from '@todo-app/shared/domain';

const todoStorage = 'TODOS';

export function getTodos(): Todo[] | [] {
  const todos = localStorage.getItem(todoStorage);

  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
}

export function addTodo(title: string): Todo {
  const newTodo: Todo = {
    title,
    checked: false,
    id: uniqid('local-'),
  };

  setTodos([...getTodos(), newTodo]);

  return newTodo;
}

export function updateTodo(id: string) {
  const updatedTodos = changeTodoStatus(getTodos(), id);
  setTodos(updatedTodos);
}

export function deleteTodo(id: string) {
  const updatedTodos = getTodos().filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
}

export function deleteCompletedTodos() {
  const updatedTodos = getTodos().filter((todo) => todo.checked !== true);
  setTodos(updatedTodos);
}

function setTodos(todos: Todo[]) {
  localStorage.setItem(todoStorage, JSON.stringify(todos));
}

export function clearTodos() {
  localStorage.removeItem(todoStorage);
}
