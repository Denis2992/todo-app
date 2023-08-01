import classNames from 'classnames';

import { FilterBar } from '@todo-react/todo/ui-filter-bar';
import styles from './TodoBar.module.scss';
import { ThemeType } from '@todo-react/shared/domain';
import { FilterType } from '@todo-app/shared/domain';

export interface TodoBarProps {
  todosLeft: number;
  theme: ThemeType;
  activeFilter: FilterType;
  isMobile: boolean;
  filterChanged: (activeFilter: FilterType) => void;
  clearedCompletedTodos: () => void;
}

export function TodoBar(props: TodoBarProps) {
  const onFilterChange = (filter: FilterType) => {
    props.filterChanged(filter);
  };

  const onClearComletedTodos = () => {
    props.clearedCompletedTodos();
  };

  return (
    <div
      className={classNames(
        styles['todo-bar'],
        styles[`todo-bar--${props.theme}`]
      )}
    >
      <p
        className={classNames(
          styles['todo-bar__info'],
          styles[`todo-bar__info--${props.theme}`]
        )}
      >
        {props.todosLeft} items left
      </p>

      {!props.isMobile && (
        <FilterBar
          activeFilter={props.activeFilter}
          filterChanged={onFilterChange}
        ></FilterBar>
      )}

      <button
        className={classNames(
          styles['todo-bar__clear-btn'],
          styles[`todo-bar__clear-btn--${props.theme}`]
        )}
        onClick={onClearComletedTodos}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TodoBar;
