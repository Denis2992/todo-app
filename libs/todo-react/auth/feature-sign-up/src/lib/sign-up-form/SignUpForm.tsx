import { FormInput } from '@todo-react/shared-ui-form-input';
import styles from './SignUpForm.module.scss';
import { Button } from '@todo-react/shared-ui-button';
import { useContext } from 'react';
import { ThemeContext } from '@todo-react/shared-store';

/* eslint-disable-next-line */
export interface SignUpFormProps {}

export function SignUpForm(props: SignUpFormProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles['sign-up']}>
      <h1
        className={`${styles['sign-up__title']} ${
          styles[`sign-up__title--${theme}`]
        }`}
      >
        Sign Up
      </h1>
      <form className={styles['sign-up-form']}>
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
        <FormInput
          type={'password'}
          name={'repeat-password'}
          label={'Repeat password'}
          theme={theme}
        ></FormInput>
        <Button theme={theme} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
