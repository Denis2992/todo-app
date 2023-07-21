import classNames from 'classnames';

import styles from './UserMessage.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface UserMessageProps {
  onTimerEnd: () => void;
  color: 'success' | 'error' | 'default';
  children?: React.ReactNode;
}

export function UserMessage(props: UserMessageProps) {
  useEffect(() => {
    const errorTimer = setTimeout(() => {
      props.onTimerEnd();
    }, 5000);

    return () => {
      clearTimeout(errorTimer);
    };
  }, [props]);

  return (
    <div className={classNames(styles['user-message'])}>
      <p
        className={classNames(styles['user-message__content'], {
          [styles[`user-message__content--${props.color}`]]:
            props.color !== 'default',
        })}
      >
        {props.children}
      </p>
    </div>
  );
}

export default UserMessage;
