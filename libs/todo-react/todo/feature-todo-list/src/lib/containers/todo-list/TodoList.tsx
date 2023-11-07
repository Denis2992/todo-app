import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
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
import { FilterType, Todo } from '@todo-app/shared/domain';
import { TodoItem } from '@todo-react/todo/ui-todo-item';
import { ThemeContext } from '@todo-react/shared/data-access';
import TodoBar from '../../components/todo-bar/TodoBar';
import TodoOrderInfo from '../../components/todo-order-info/TodoOrderInfo';

export interface TodoListProps {
  isMobile: boolean;
  todos: Todo[];
  activeFilter: FilterType;
  todoOrderChanged: boolean;
  itemDeleted: (id: string) => void;
  checkboxClicked: (id: string) => void;
  filterChanged: (activeFilter: FilterType) => void;
  onDragEnd: (id: string, newIndex: number, oldIndex: number) => void;
  clearedCompletedTodos: () => void;
  todoOrderSaved: () => void;
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

  const todosLeft: number = props.todos.filter((todo) => !todo.checked).length;

  const filteredTodos = () => {
    switch (props.activeFilter) {
      case FilterType.ACTIVE:
        return props.todos.filter((todo) => !todo.checked);
      case FilterType.COMPLETED:
        return props.todos.filter((todo) => todo.checked);
      default:
        return props.todos;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = props.todos.findIndex(
        (todo) => todo.id === active.id
      );
      const overIndex = props.todos.findIndex((todo) => todo.id === over?.id);

      props.onDragEnd(active.id.toString(), activeIndex, overIndex);
    }
  };

  const onCheckboxClick = (id: string) => {
    props.checkboxClicked(id);
  };

  const onItemDelete = (id: string) => {
    props.itemDeleted(id);
  };

  const onTodoOrderSave = () => {
    props.todoOrderSaved();
  };

  const onFilterChange = (filter: FilterType) => {
    props.filterChanged(filter);
  };

  const onClearCompletedTodos = () => {
    props.clearedCompletedTodos();
  };

  return (
    <DndContext
      data-testid="dnd-contex"
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
            {filteredTodos().map((todo, index) => (
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

        <TodoOrderInfo
          orderChanged={props.todoOrderChanged}
          orderSaved={onTodoOrderSave}
          theme={theme}
        ></TodoOrderInfo>

        <TodoBar
          todosLeft={todosLeft}
          theme={theme}
          activeFilter={props.activeFilter}
          isMobile={props.isMobile}
          filterChanged={onFilterChange}
          clearedCompletedTodos={onClearCompletedTodos}
        ></TodoBar>
      </div>
    </DndContext>
  );
}

export default TodoList;
