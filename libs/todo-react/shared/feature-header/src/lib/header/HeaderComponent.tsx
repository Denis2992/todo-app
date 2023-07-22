import { useContext } from 'react';

import styles from './HeaderComponent.module.scss';
import { Link } from 'react-router-dom';
import {
  AuthContext,
  ThemeContext,
  ThemeContextType,
} from '@todo-react/shared/data-access';

export function HeaderComponent() {
  const { theme, changeTheme } = useContext(ThemeContext) as ThemeContextType;
  const { isAuth, userName, clearUser } = useContext(AuthContext);
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
          {isAuth ? (
            <>
              <p className={styles['header-container-menu__welcome']}>
                Welcome, {userName}!
              </p>
              <img
                className={styles['header-container-menu__icon']}
                src="../assets/logout-icon.png"
                alt="logout"
                onClick={clearUser}
              />
            </>
          ) : (
            <Link to="/login">
              <img
                className={styles['header-container-menu__icon']}
                src="../assets/login-icon.png"
                alt="login"
              />
            </Link>
          )}

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
