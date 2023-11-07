import { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import styles from './TodoItem.module.scss';
import { Todo } from '@todo-app/shared/domain';
import { Checkbox } from '@todo-react/todo/ui-checkbox';
import { ThemeContext } from '@todo-react/shared/data-access';

export interface TodoItemProps {
  todo: Todo;
  index: number;
  itemDeleted: (id: string) => void;
  checkboxClicked: (id: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const { theme } = useContext(ThemeContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onCheckBoxClick = () => {
    props.checkboxClicked(props.todo.id);
  };

  const onItemDelete = () => {
    props.itemDeleted(props.todo.id);
  };

  const isItemFirst = () => {
    return props.index === 0
      ? styles[`todo-item--${theme}-first`]
      : styles[`todo-item--${theme}-middle`];
  };

  return (
    <div style={style} ref={setNodeRef}>
      <div
        className={classNames(
          styles['todo-item'],
          styles[`todo-item--${theme}`],
          { [styles['todo-item--dragging']]: isDragging },
          isItemFirst()
        )}
      >
        <div className={styles['todo-item-info']}>
          <Checkbox
            checked={props.todo.checked}
            checkboxClicked={onCheckBoxClick}
          ></Checkbox>

          <div
            className={classNames(styles['todo-item-drag-area'], {
              [styles['todo-item-drag-area--dragging']]: isDragging,
            })}
            {...attributes}
            {...listeners}
            data-testid="sortable-item"
          >
            <p
              className={classNames(
                styles['todo-item-drag-area__title'],
                styles[`todo-item-drag-area__title--${theme}`],
                {
                  [styles[`todo-item-drag-area__title--${theme}-disabled`]]:
                    props.todo.checked,
                }
              )}
            >
              {props.todo.title}
            </p>
          </div>
        </div>

        <button
          data-testid="delete-todo-btn"
          className={classNames(
            styles['todo-item__delete-btn'],
            styles[`todo-item__delete-btn--${theme}`]
          )}
          onClick={onItemDelete}
        >
          <img src={`../assets/icon-cross.svg`} alt="cross-icon" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
