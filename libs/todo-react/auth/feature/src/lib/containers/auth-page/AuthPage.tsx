import { ReactNode, useContext } from 'react';

import styles from './AuthPage.module.scss';
import { ThemeContext } from '@todo-react/shared/data-access';

export interface AuthPageWrapperProps {
  children: ReactNode;
}

export function AuthPage(props: AuthPageWrapperProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles['auth-page']} ${styles[`auth-page--${theme}`]}`}>
      {props.children}
    </div>
  );
}

export default AuthPage;
