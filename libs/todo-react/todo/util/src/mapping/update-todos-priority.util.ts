import { Todo } from '@todo-app/shared/domain';

export const updateTodosPriority = (
  todos: Todo[],
  id: string,
  oldIndex: number,
  newIndex: number
) => {
  let index: number;
  let sliceFrom: number;
  let sliceTo: number;

  if (oldIndex < newIndex) {
    index = oldIndex;
    sliceFrom = oldIndex;
    sliceTo = newIndex + 1;
  } else {
    index = newIndex + 1;
    sliceFrom = newIndex;
    sliceTo = oldIndex + 1;
  }

  const updatedTodosPriority = todos.slice(sliceFrom, sliceTo).map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        index: newIndex,
      };
    } else {
      const updatedTodo = { ...todo, index };
      index++;
      return updatedTodo;
    }
  });

  todos.splice(sliceFrom, sliceTo - sliceFrom, ...updatedTodosPriority);
  return todos;
};
