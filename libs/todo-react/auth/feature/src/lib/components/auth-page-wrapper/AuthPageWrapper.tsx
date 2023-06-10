import { useContext } from 'react';

import { ThemeContext } from '@todo-react/shared-store';
import styles from './AuthPageWrapper.module.scss';

export interface AuthPageWrapperProps {
  children: React.ReactNode;
}

export function AuthPageWrapper(props: AuthPageWrapperProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles['auth-page']} ${styles[`auth-page--${theme}`]}`}>
      {props.children}
    </div>
  );
}

export default AuthPageWrapper;
