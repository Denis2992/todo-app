import useBreakpoint from 'use-breakpoint';
import { useContext, useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import classNames from 'classnames';

import styles from './TodoPage.module.scss';
import { BREAKPOINTS } from '@todo-react/shared/domain';
import { TodoList } from '@todo-react/todo/feature-todo-list';
import { TodoInput } from '@todo-react/todo/ui-todo-input';
import { FilterBar } from '@todo-react/todo/ui-filter-bar';
import { FilterType, Todo } from '@todo-app/shared/domain';
import { todoDataAccess } from '@todo-react/todo/data-access';
import { UserMessage } from '@todo-react/shared/ui-user-message';
import { AuthContext, ThemeContext } from '@todo-react/shared/data-access';
import {
  updateTodosAfterDeleteMany,
  updateTodosAfterDeleteOne,
  updateTodosPriority,
  updateTodoStatus,
} from '@todo-react/todo/util';

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const [todoOrderChanged, setTodoOrderChanged] = useState(false);
  const [userMessage, setUserMessage] = useState<{
    message: string;
    status: 'success' | 'error';
  } | null>(null);
  const { theme } = useContext(ThemeContext);
  const { isAuth, token } = useContext(AuthContext);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    todoDataAccess
      .getTodos(token)
      .then((res) => {
        setTodos(res.todos);
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
      });
  }, [isAuth, token]);

  const isMobile = (): boolean => {
    return breakpoint === 'mobile';
  };

  const onItemAdd = (todo: string) => {
    todoDataAccess
      .addTodo(todo, token)
      .then((resData) => {
        setTodos((prevState) => [...prevState, resData.todo]);
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
      });
  };

  const handleDragEnd = (id: string, newIndex: number, oldIndex: number) => {
    setTodos((prevState) =>
      arrayMove(
        updateTodosPriority(prevState, id, newIndex, oldIndex),
        newIndex,
        oldIndex
      )
    );
    setTodoOrderChanged(true);
  };

  const onTodoOrderSave = () => {
    todoDataAccess
      .updateTodosOrder(token, todos)
      .then((res) => {
        setTodoOrderChanged(false);
        setUserMessage({ message: res.message, status: 'success' });
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
      });
  };

  const onCheckboxClick = (id: string) => {
    todoDataAccess
      .updateTodoStatus(id, token)
      .then(() => {
        setTodos((prevTodos) => updateTodoStatus(prevTodos, id));
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
      });
  };

  const onItemDelete = (id: string) => {
    todoDataAccess
      .deleteTodo(id, token)
      .then((resData) => {
        setTodos((prevState) =>
          updateTodosAfterDeleteOne(prevState, resData.todoId)
        );
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
      });
  };

  const onFilterChange = (activeFilter: FilterType) => {
    setActiveFilter(activeFilter);
  };

  const onClearCompletedTodos = () => {
    todoDataAccess
      .deleteCompletedTodos(token)
      .then(() => {
        setTodos((prevTodos) => updateTodosAfterDeleteMany(prevTodos));
      })
      .catch((err) => {
        setUserMessage({ message: err.message, status: 'error' });
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
              todos={todos}
              activeFilter={activeFilter}
              todoOrderChanged={todoOrderChanged}
              checkboxClicked={onCheckboxClick}
              itemDeleted={onItemDelete}
              onDragEnd={handleDragEnd}
              todoOrderSaved={onTodoOrderSave}
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

        {userMessage && (
          <UserMessage
            color={userMessage.status}
            onTimerEnd={() => setUserMessage(null)}
          >
            {userMessage.message}
          </UserMessage>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
