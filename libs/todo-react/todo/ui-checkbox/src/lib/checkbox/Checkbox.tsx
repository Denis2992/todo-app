import { MouseEvent, useContext } from 'react';
import styles from './Checkbox.module.scss';
import classNames from 'classnames';
import { ThemeContext } from '@todo-react/shared/data-access';

export interface CheckboxProps {
  checked: boolean;
  checkboxClicked: () => void;
}

export function Checkbox(props: CheckboxProps) {
  const { theme } = useContext(ThemeContext);
  const isChecked = props.checked
    ? styles['checkbox--checked']
    : styles[`checkbox--unchecked-${theme}`];
  const checkHandler = (e: MouseEvent) => {
    e.preventDefault();
    props.checkboxClicked();
  };

  return (
    <button
      data-testid="check-todo-btn"
      className={classNames(
        styles.checkbox,
        styles[`checkbox--${theme}`],
        isChecked
      )}
      onClick={checkHandler}
    >
      {props.checked && <img src="../assets/icon-check.svg" alt="check-icon" />}
    </button>
  );
}

export default Checkbox;
