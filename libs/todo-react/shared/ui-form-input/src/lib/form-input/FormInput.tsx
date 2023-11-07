import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

import styles from './FormInput.module.scss';
import { ThemeType } from '@todo-react/shared/domain';

export interface FormInputProps {
  type: 'password' | 'text';
  name: string;
  label: string;
  theme: ThemeType;
  register: UseFormRegisterReturn<string>;
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

  return (
    <div className={classNames(styles['form-input'], styles['field'])}>
      <input
        type={showPassword ? 'text' : props.type}
        autoComplete="on"
        className={classNames(
          styles['form-input__field'],
          styles[`form-input__field--${props.theme}`]
        )}
        placeholder={props.label}
        id={props.name}
        {...props.register}
      />

      {showToggleButton && (
        <div
          className={classNames(
            styles['form-input-show-password'],
            styles[`form-input-show-password--${props.theme}`]
          )}
        >
          <img
            className={styles['form-input-show-password__icon']}
            src={`../assets/${showPassword ? 'view' : 'hide'}-icon.png`}
            alt="show-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          ></img>
        </div>
      )}

      <label
        htmlFor={props.name}
        className={classNames(
          styles['form-input__label'],
          styles[`form-input__label--${props.theme}`]
        )}
      >
        {props.label}
      </label>
      {props.errorMessage && (
        <p className={styles['form-input__message']}>{props.errorMessage}</p>
      )}
    </div>
  );
}

export default FormInput;
