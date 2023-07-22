import useBreakpoint from 'use-breakpoint';
import { useContext, useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import styles from './TodoPage.module.scss';
import { BREAKPOINTS } from '@todo-react/shared/domain';
import { TodoList } from '@todo-react/todo/feature-todo-list';
import { TodoInput } from '@todo-react/todo/ui-todo-input';
import { FilterBar } from '@todo-react/todo/ui-filter-bar';
import { FilterType, Todo } from '@todo-app/shared/domain';
import {
  todoDataAccess,
  todoLocaleStorage,
} from '@todo-react/todo/data-access';
import classNames from 'classnames';
import { UserMessage } from '@todo-react/shared/ui-user-message';
import { AuthContext, ThemeContext } from '@todo-react/shared/data-access';
import { changeTodoStatus } from '@todo-react/todo/util';

export function TodoPage() {
  const { theme } = useContext(ThemeContext);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const { isAuth, token } = useContext(AuthContext);

  useEffect(() => {
    todoDataAccess
      .getTodos(token)
      .then((res) => {
        setTodos(res.todos);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, [isAuth, token]);

  const isMobile = (): boolean => {
    return breakpoint === 'mobile';
  };

  const filteredTodos = () => {
    switch (activeFilter) {
      case FilterType.ACTIVE:
        return todos.filter((todo) => todo.checked === false);
      case FilterType.COMPLETED:
        return todos.filter((todo) => todo.checked === true);
      default:
        return todos;
    }
  };

  const onItemAdd = (todo: string) => {
    todoDataAccess
      .addTodo(todo, token)
      .then((resData) => {
        setTodos((prevState) => [...prevState, resData.todo]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const handleDragEnd = (activeIndex: number, overIndex: number) => {
    setTodos((prevState) => arrayMove(prevState, activeIndex, overIndex));
  };

  const onCheckboxClick = (id: string) => {
    todoDataAccess
      .updateTodo(id, token)
      .then(() => {
        setTodos((prevTodos) => changeTodoStatus(prevTodos, id));
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const onItemDelete = (id: string) => {
    todoDataAccess
      .deleteTodo(id, token)
      .then((resData) => {
        setTodos((prevState) =>
          prevState.filter((todo) => todo.id !== resData.todoId)
        );
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const onFilterChange = (activeFilter: FilterType) => {
    setActiveFilter(activeFilter);
  };

  const onClearCompletedTodos = () => {
    todoDataAccess
      .deleteComplitedTodos(token)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.checked !== true)
        );
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className={styles.todo}>
      <div className={styles['todo-content']}>
        <TodoInput itemAdded={onItemAdd}></TodoInput>
        {todos.length > 0 ? (
          <div className={styles['todo-list']}>
            <TodoList
              isMobile={isMobile()}
              todos={filteredTodos()}
              checkboxClicked={onCheckboxClick}
              itemDeleted={onItemDelete}
              onDragEnd={handleDragEnd}
              activeFilter={activeFilter}
              filterChanged={onFilterChange}
              clearedCompletedTodos={onClearCompletedTodos}
            ></TodoList>

            {isMobile() && (
              <FilterBar
                activeFilter={activeFilter}
                filterChanged={onFilterChange}
              ></FilterBar>
            )}

            <p
              className={classNames(
                styles['todo-list__info-tip'],
                styles[`todo-list__info-tip--${theme}`]
              )}
            >
              Drag and drop to reorder list
            </p>
          </div>
        ) : (
          <p
            className={classNames(
              styles['todo-list__no-items'],
              styles[`todo-list__no-items--${theme}`]
            )}
          >
            There is no todo yet
          </p>
        )}

        {errorMessage && (
          <UserMessage color="error" onTimerEnd={() => setErrorMessage(null)}>
            {errorMessage}
          </UserMessage>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
