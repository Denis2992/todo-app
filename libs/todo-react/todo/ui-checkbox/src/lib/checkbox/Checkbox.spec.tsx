import { fireEvent, render } from '@testing-library/react';

import Checkbox, { CheckboxProps } from './Checkbox';

const checkboxProps: CheckboxProps = {
  checked: false,
  checkboxClicked: jest.fn(),
};

describe('Checkbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Checkbox {...checkboxProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call checkboxClicked property on checkbox click', () => {
    const { getByTestId } = render(<Checkbox {...checkboxProps} />);

    const checkbox = getByTestId('check-todo-btn');

    fireEvent.click(checkbox);

    expect(checkboxProps.checkboxClicked).toHaveBeenCalled();
  });
});
