import { FormInput } from '@todo-react/shared-ui-form-input';
import styles from './LoginForm.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '@todo-react/shared-store';
import { ThemeType } from '@todo-react/shared-domain';
import { Button } from '@todo-react/shared-ui-button';
import { Link, Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles['login']}>
      <h1
        className={`${styles['login__title']} ${
          styles[`login__title--${theme}`]
        }`}
      >
        Login
      </h1>
      <form className={styles['login-form']}>
        <FormInput
          type={'email'}
          name={'email'}
          label={'Email'}
          theme={theme}
        ></FormInput>
        <FormInput
          type={'password'}
          name={'Password'}
          label={'Password'}
          errorMessage="sdsfsfsdfsfdf"
          theme={theme}
        ></FormInput>
        <Button theme={theme} type="submit">
          Login
        </Button>
        <div className={styles['login-sign-up']}>
          <p
            className={`${styles['login-sign-up__message']} ${
              styles[`login-sign-up__message--${theme}`]
            }`}
          >
            Don't have an account?
          </p>
          <Link to="/sign-up" className={styles['login-sign-up__link']}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
