import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './SignUpForm.module.scss';
import { FormInput } from '@todo-react/shared/ui-form-input';
import { Button } from '@todo-react/shared/ui-button';
import { SignupPayload } from '@todo-app/shared/domain';
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  signUpPasswordValidator,
} from '@todo-react/auth/domain';
import { signupUser } from '@todo-react/auth/data-access';
import { UserMessage } from '@todo-react/shared/ui-user-message';
import { ThemeContext } from '@todo-react/shared/data-access';

type signUpFormInputType = 'email' | 'name' | 'password' | 'confirmPassword';

export function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<SignupPayload>();

  const getInputErrorMessage = (
    input: signUpFormInputType
  ): string | undefined => {
    return errors[input]?.message?.toString();
  };

  const signUpSubmit: SubmitHandler<SignupPayload> = (form) => {
    signupUser(form)
      .then(() => {
        navigate('/login', { state: { signUpSucceed: true } });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className={styles['sign-up']}>
      <h1
        className={classNames(
          styles['sign-up__title'],
          styles[`sign-up__title--${theme}`]
        )}
      >
        Sign Up
      </h1>
      <form
        className={styles['sign-up-form']}
        onSubmit={handleSubmit(signUpSubmit)}
      >
        <FormInput
          type={'text'}
          name={'email'}
          label={'Email'}
          theme={theme}
          register={register('email', { ...emailValidator })}
          errorMessage={getInputErrorMessage('email')}
        ></FormInput>

        <FormInput
          type={'text'}
          name={'name'}
          label={'Name'}
          theme={theme}
          register={register('name', { ...nameValidator })}
          errorMessage={getInputErrorMessage('name')}
        ></FormInput>

        <FormInput
          type={'password'}
          name={'Password'}
          label={'Password'}
          theme={theme}
          register={register('password', { ...signUpPasswordValidator })}
          errorMessage={getInputErrorMessage('password')}
        ></FormInput>

        <FormInput
          type={'password'}
          name={'repeat-password'}
          label={'Repeat password'}
          theme={theme}
          register={register(
            'confirmPassword',
            confirmPasswordValidator(getValues)
          )}
          errorMessage={getInputErrorMessage('confirmPassword')}
        ></FormInput>

        <Button theme={theme} type="submit">
          Submit
        </Button>
      </form>

      {errorMessage && (
        <UserMessage color="error" onTimerEnd={() => setErrorMessage(null)}>
          {errorMessage}
        </UserMessage>
      )}
    </div>
  );
}

export default SignUpForm;
