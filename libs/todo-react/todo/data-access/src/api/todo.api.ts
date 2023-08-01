import { Todo } from '@todo-app/shared/domain';

export async function getTodos(
  token: string | null
): Promise<{ message: string; todos: Todo[] }> {
  const res = await fetch('/api/todo', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (res.status !== 200) {
    throw new Error('Failed to fetch todos.');
  }

  return res.json();
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

  if (res.status !== 201) {
    throw new Error('Creating a todo failed!');
  }
  return res.json();
}

export async function addManyTodos(
  token: string | null,
  todos: Todo[]
): Promise<{ message: string; todos: Todo[] }> {
  const res = await fetch('/api/todo/add-many', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });

  if (res.status !== 201) {
    throw new Error('Creating a todos failed!');
  }

  return res.json();
}

export async function updateTodoStatus(
  id: string,
  token: string | null
): Promise<{ message: string }> {
  const res = await fetch('/api/todo/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Updating a todo failed!');
  }

  return res.json();
}

export async function updateTodosOrder(
  token: string | null,
  todos: Todo[]
): Promise<{ message: string }> {
  const res = await fetch('/api/todo/update-order', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });

  if (res.status !== 200) {
    throw new Error('Saving todos order failed!');
  }

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

  if (res.status !== 200) {
    throw new Error('Deleting a todo failed!');
  }

  return res.json();
}

export async function deleteComplitedTodos(
  token: string | null
): Promise<{ message: string }> {
  const res = await fetch('/api/todo/delete-completed', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (res.status !== 200) {
    throw new Error('Deleting a completed todo failed!');
  }

  return res.json();
}
