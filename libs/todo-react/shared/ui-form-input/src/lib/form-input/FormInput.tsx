import { useContext, useEffect, useState } from 'react';
import styles from './FormInput.module.scss';
import { ThemeType } from '@todo-react/shared-domain';
import { ThemeContext } from '@todo-react/shared-store';

/* eslint-disable-next-line */
export interface FormInputProps {
  type: 'email' | 'password' | 'text';
  name: string;
  label: string;
  theme: ThemeType;
  errorMessage?: string;
}

export function FormInput(props: FormInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToggleButton, setShowToggleButton] = useState<boolean>(false);

  useEffect(() => {
    if (props.type === 'password') {
      setShowToggleButton(true);
    }
  }, [props.type]);

  const showPasswordIcon = () => {
    if (showToggleButton) {
      return (
        <div
          className={`${styles['form-input-show-password']} ${
            styles[`form-input-show-password--${props.theme}`]
          }`}
        >
          <img
            className={styles['form-input-show-password__icon']}
            src={`../assets/${showPassword ? 'hide' : 'view'}-icon.png`}
            alt="show-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          ></img>
        </div>
      );
    }
  };

  return (
    <div className={`${styles['form-input']}  ${styles['field']}`}>
      <input
        type={showPassword ? 'text' : props.type}
        className={`${styles['form-input__field']} ${
          styles[`form-input__field--${props.theme}`]
        }`}
        placeholder={props.label}
        name={props.name}
        id={props.name}
        required
      />
      {showPasswordIcon()}
      <label
        htmlFor="name"
        className={`${styles['form-input__label']} ${
          styles[`form-input__label--${props.theme}`]
        }`}
      >
        {props.label}
      </label>
      {props.errorMessage && (
        <p className={styles['form-input__message']}>Text info</p>
      )}
    </div>
  );
}

export default FormInput;
