import { checkStatusCode } from '@todo-react/shared/util';
import { Todo } from '@todo-app/shared/domain';

export async function getTodos(
  token: string | null
): Promise<{ message: string; todos: Todo[] }> {
  const res = await fetch('/api/todo', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  checkStatusCode(res, 'Failed to fetch todos');

  return await res.json();
}

export async function addTodo(
  title: string,
  token: string | null
): Promise<{ message: string; todo: Todo }> {
  const res = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  checkStatusCode(res, 'Creating a todo failed!', 201);

  return res.json();
}

export async function updateTodo(
  id: string,
  token: string | null
): Promise<{ message: string }> {
  const res = await fetch('/api/todo/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  checkStatusCode(res, 'Updating a todo failed!');

  return res.json();
}

export async function deleteTodo(
  id: string,
  token: string | null
): Promise<{ message: string; todoId: string }> {
  const res = await fetch('/api/todo/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  checkStatusCode(res, 'Deleting a todo failed!');

  return res.json();
}

export async function deleteComplitedTodos(
  token: string | null
): Promise<{ message: string }> {
  const res = await fetch('/api/todo/delete-completed', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  checkStatusCode(res, 'Deleting a completed todo failed!');

  return res.json();
}
