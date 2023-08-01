import classNames from 'classnames';

import { ThemeType } from '@todo-react/shared/domain';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  theme?: ThemeType;
  gradient?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type={props.type}
      className={classNames(styles['cta'], {
        [styles[`cta--${props.theme}`]]: props.theme,
        [styles['cta--gradient']]: props.gradient,
      })}
      onClick={onClickHandler}
    >
      {props.children}
    </button>
  );
}

export default Button;
