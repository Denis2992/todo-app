import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import TodoOrderInfo, { TodoOrderInfoProps } from './TodoOrderInfo';
import { ThemeType } from '@todo-react/shared/domain';
import { act } from 'react-dom/test-utils';

const orderInfoProps: TodoOrderInfoProps = {
  orderChanged: false,
  theme: ThemeType.LIGHT,
  orderSaved: jest.fn(),
};

describe('TodoOrderInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoOrderInfo {...orderInfoProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call orderSaved property on order save click and render and unmount success message', async () => {
    jest.useFakeTimers();

    const { theme, orderSaved } = orderInfoProps;
    const { getByText } = render(
      <TodoOrderInfo
        orderChanged={true}
        theme={theme}
        orderSaved={orderSaved}
      />
    );

    const saveButton = getByText('Save the changes');
    fireEvent.click(saveButton);

    expect(orderSaved).toHaveBeenCalled();

    const successMessage = getByText(
      'Todos order has been updated successfully!'
    );
    expect(successMessage).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5100);
    });

    await waitFor(() => {
      expect(successMessage).not.toBeInTheDocument();
    });
  });
});
