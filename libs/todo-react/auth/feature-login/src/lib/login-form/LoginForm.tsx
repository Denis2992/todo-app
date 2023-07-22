import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { FormInput } from '@todo-react/shared/ui-form-input';
import styles from './LoginForm.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@todo-react/shared/ui-button';
import {
  emailValidator,
  loginPasswordValidator,
} from '@todo-react/auth/domain';
import { loginUser } from '@todo-react/auth/data-access';
import { LoginPayload } from '@todo-app/shared/domain';
import { UserMessage } from '@todo-react/shared/ui-user-message';
import { AuthContext, ThemeContext } from '@todo-react/shared/data-access';

export function LoginForm() {
  const [signUpSucceed, setSignUpSucceed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSignUpSucceed(!!location.state?.signUpSucceed);
  }, [location.state?.signUpSucceed]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginPayload>();

  const loginSubmit: SubmitHandler<LoginPayload> = (form) => {
    loginUser(form)
      .then((res) => {
        setUser(res.token, res.userName);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className={styles['login']}>
      <h1
        className={classNames(
          styles['login__title'],
          styles[`login__title--${theme}`]
        )}
      >
        Login
      </h1>

      <form
        className={styles['login-form']}
        onSubmit={handleSubmit(loginSubmit)}
      >
        <FormInput
          type={'text'}
          name={'email'}
          label={'Email'}
          theme={theme}
          register={register('email', { ...emailValidator })}
          errorMessage={errors.email?.message?.toString()}
        ></FormInput>

        <FormInput
          type={'password'}
          name={'password'}
          label={'Password'}
          theme={theme}
          register={register('password', { ...loginPasswordValidator })}
          errorMessage={errors.password?.message?.toString()}
        ></FormInput>
        <Button theme={theme} type="submit">
          Login
        </Button>
      </form>

      <div className={styles['user-message']}>
        {errorMessage && (
          <UserMessage color="error" onTimerEnd={() => setErrorMessage(null)}>
            {errorMessage}
          </UserMessage>
        )}

        {signUpSucceed && (
          <UserMessage
            onTimerEnd={() => setSignUpSucceed(false)}
            color="success"
          >
            Acount was created successfully! Now you can login
          </UserMessage>
        )}

        {!signUpSucceed && (
          <div
            className={classNames(
              styles['user-message__sign-up'],
              styles[`user-message__sign-up--${theme}`]
            )}
          >
            <p>Don't have an account?</p>
            <Link to="/sign-up" className={styles['user-message__link']}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
