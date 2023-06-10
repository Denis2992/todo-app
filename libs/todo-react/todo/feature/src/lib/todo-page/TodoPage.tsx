import useBreakpoint from 'use-breakpoint';
import { MouseEventHandler, useContext, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import styles from './TodoPage.module.scss';
import { BREAKPOINTS } from '@todo-react/shared-domain';
import { ThemeContext } from '@todo-react/shared-store';
import { TodoList } from '@todo-react/feature-todo-list';
import { TodoInput } from '@todo-react/ui-todo-input';
import { FilterBar } from '@todo-react/ui-filter-bar';
import { FilterType, Todo } from '@shared/domain';
import classNames from 'classnames';

export function TodoPage() {
  const { theme } = useContext(ThemeContext);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [todos, setTodos] = useState<Todo[]>([
    { title: '11111', checked: false, id: 'asdqwe1' },
    { title: '22222', checked: true, id: 'dfgre4kkj' },
    { title: '33333', checked: false, id: 'sdfer4hgf' },
  ]);
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);

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
    setTodos((prevState) => {
      return [
        ...prevState,
        {
          id: new Date().toString(),
          checked: false,
          title: todo,
        },
      ];
    });
  };

  const handleDragEnd = (activeIndex: number, overIndex: number) => {
    setTodos((prevState) => arrayMove(prevState, activeIndex, overIndex));
  };

  const onCheckboxClick = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      });
    });
  };

  const onItemDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onFilterChange = (activeFilter: FilterType) => {
    setActiveFilter(activeFilter);
  };

  const onClearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.checked !== true));
  };

  return (
    <div className={styles.todo}>
      <div className={styles['todo-content']}>
        <TodoInput itemAdded={onItemAdd}></TodoInput>
        {todos.length ? (
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
      </div>
    </div>
  );
}

export default TodoPage;
