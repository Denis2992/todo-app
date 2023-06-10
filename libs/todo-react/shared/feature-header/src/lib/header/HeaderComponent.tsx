import { useContext } from 'react';

import styles from './HeaderComponent.module.scss';
import { ThemeContext, ThemeContextType } from '@todo-react/shared-store';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function HeaderComponent(props: HeaderProps) {
  const { theme, changeTheme } = useContext(ThemeContext) as ThemeContextType;
  const iconPath = theme === 'light' ? 'moon' : 'sun';

  const handleChangeTheme = () => {
    changeTheme();
  };

  return (
    <header>
      <div className={styles['header-container']}>
        <Link to="/">
          <img
            className={styles['header-container__logo']}
            src="../assets/app-logo.png"
            alt="logo"
          />
        </Link>

        <div className={styles['header-container-menu']}>
          <Link to="/login">
            <img
              className={styles['header-container-menu__icon']}
              src="../assets/login-icon.png"
              alt="login"
            />
          </Link>

          <img
            className={styles['header-container-menu__icon']}
            src={`../assets/icon-${iconPath}.svg`}
            alt="check-theme-icon"
            onClick={handleChangeTheme}
          />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
