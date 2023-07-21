import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './TodoInput.module.scss';
import { ThemeContext } from '@todo-react/shared/store';
import classNames from 'classnames';

const schema = yup.object({
  newTodo: yup
    .string()
    .min(6, 'todo title must be at least 6 characters')
    .required(),
});
type FormData = yup.InferType<typeof schema>;

export interface TodoInputProps {
  itemAdded: (todo: string) => void;
}

export function TodoInput(props: TodoInputProps) {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitTodo = (form: FormData) => {
    if (form.newTodo) {
      props.itemAdded(form.newTodo);
      reset();
    }
  };

  return (
    <>
      <form
        className={classNames(styles.form, styles[`form--${theme}`])}
        onSubmit={handleSubmit(submitTodo)}
      >
        <button className={styles['form__button']} type="submit"></button>
        <input
          className={classNames(
            styles['form__input'],
            styles[`form__input--${theme}`]
          )}
          type="text"
          placeholder="Create a new todo…"
          {...register('newTodo')}
        ></input>
      </form>
      <p className={styles['form__message']}>{errors.newTodo?.message}</p>
    </>
  );
}

export default TodoInput;
