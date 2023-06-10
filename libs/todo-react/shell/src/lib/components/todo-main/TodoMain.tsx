import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './TodoMain.module.scss';
import { ThemeContext } from '@todo-react/shared-store';
import { HeaderComponent } from '@todo-react/shared-feature-header';
import classNames from 'classnames';

export function TodoMain() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames(styles.todo, styles[`todo--${theme}`])}>
      <div className={styles['todo-content']}>
        <HeaderComponent />
        <Outlet />
      </div>
    </div>
  );
}

export default TodoMain;
