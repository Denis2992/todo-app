import { ThemeType } from '@todo-react/shared/domain';
import styles from './Button.module.scss';

export interface ButtonProps {
  theme: ThemeType;
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export function Button(props: ButtonProps) {
  return (
    <button className={`${styles['cta']} ${styles[`cta--${props.theme}`]}`}>
      {props.children}
    </button>
  );
}

export default Button;
