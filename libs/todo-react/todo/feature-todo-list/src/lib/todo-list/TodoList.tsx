import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import classNames from 'classnames';

import styles from './TodoList.module.scss';
import { useContext } from 'react';
import { FilterType, Todo } from '@shared/domain';
import { TodoItem } from '@todo-react/ui-todo-item';
import { ThemeContext } from '@todo-react/shared-store';
import { FilterBar } from '@todo-react/ui-filter-bar';

export interface TodoListProps {
  isMobile: boolean;
  todos: Todo[];
  activeFilter: FilterType;
  itemDeleted: (id: string) => void;
  checkboxClicked: (id: string) => void;
  filterChanged: (activeFilter: FilterType) => void;
  onDragEnd: (activeIndex: number, overIndex: number) => void;
  clearedCompletedTodos: () => void;
}

export function TodoList(props: TodoListProps) {
  const { theme } = useContext(ThemeContext);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 8,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const todosLeft = (): number => {
    return props.todos.filter((todo) => todo.checked === false).length;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = props.todos.findIndex(
        (todo) => todo.id === active.id
      );
      const overIndex = props.todos.findIndex((todo) => todo.id === over?.id);
      props.onDragEnd(activeIndex, overIndex);
    }
  };

  const onCheckboxClick = (id: string) => {
    props.checkboxClicked(id);
  };

  const onItemDelete = (id: string) => {
    props.itemDeleted(id);
  };

  const onFilterChange = (filter: FilterType) => {
    props.filterChanged(filter);
  };

  const onClearComletedTodos = () => {
    props.clearedCompletedTodos();
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div
        className={classNames(styles['todo-list'], {
          [styles['todo-list--light']]: theme === 'light',
        })}
      >
        {props.todos.length ? (
          <SortableContext
            items={props.todos}
            strategy={verticalListSortingStrategy}
          >
            {props.todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                itemDeleted={onItemDelete}
                checkboxClicked={onCheckboxClick}
              ></TodoItem>
            ))}
          </SortableContext>
        ) : (
          <div
            className={classNames(
              styles['todo-list-empty-filter'],
              styles[`todo-list-empty-filter--${theme}`]
            )}
          >
            <p>No items was found.</p>
          </div>
        )}

        <div
          className={classNames(
            styles['todo-list-summary'],
            styles[`todo-list-summary--${theme}`]
          )}
        >
          <p
            className={classNames(
              styles['todo-list-summary__left'],
              styles[`todo-list-summary__left--${theme}`]
            )}
          >
            {todosLeft()} items left
          </p>

          {!props.isMobile && (
            <FilterBar
              activeFilter={props.activeFilter}
              filterChanged={onFilterChange}
            ></FilterBar>
          )}

          <button
            className={classNames(
              styles['todo-list-summary__clear-btn'],
              styles[`todo-list-summary__clear-btn--${theme}`]
            )}
            onClick={onClearComletedTodos}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </DndContext>
  );
}

export default TodoList;
