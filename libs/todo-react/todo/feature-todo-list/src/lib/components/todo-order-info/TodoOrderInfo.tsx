import classNames from 'classnames';

import { Button } from '@todo-react/shared/ui-button';
import styles from './TodoOrderInfo.module.scss';
import { ThemeType } from '@todo-react/shared/domain';
import { useEffect, useState } from 'react';


export interface TodoOrderInfoProps {
  orderChanged: boolean;
  theme: ThemeType;
  orderSaved: () => void;
}

export function TodoOrderInfo(props: TodoOrderInfoProps) {
  const [showSuccessMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const messageTimer = setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);

      return () => {
        clearTimeout(messageTimer);
      };
    }
  }, [showSuccessMessage]);

  const onOrderSave = () => {
    props.orderSaved();
    setSuccessMessage(true);
  };

  return (
    <>
      {props.orderChanged && (
        <div
          className={classNames(
            styles['order-info'],
            styles[`order-info--${props.theme}`]
          )}
        >
          <div className={styles['order-info-content']}>
            <img
              className={styles['order-info-content__icon']}
              src="../assets/info-icon.png"
              alt="logout"
            />
            <p className={styles['order-info-content__message']}>
              Todos order has been changed
            </p>
          </div>

          <Button type="button" gradient={true} onClick={onOrderSave}>
            Save the changes
          </Button>
        </div>
      )}

      {showSuccessMessage && (
        <div
          className={classNames(
            styles['order-info'],
            styles['order-info--success']
          )}
        >
          <div className={classNames(styles['order-info-content'])}>
            <p className={styles['order-info-content__message--success']}>
              Todos order has been updated successfully!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoOrderInfo;
