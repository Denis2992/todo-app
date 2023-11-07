import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FormInput, { FormInputProps } from './FormInput';
import { ThemeType } from '@todo-react/shared/domain';

describe('FormInput', () => {
  const defaultProps: FormInputProps = {
    type: 'password',
    name: 'test',
    label: 'password',
    theme: ThemeType.DARK,
    register: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
      name: 'test',
    },
  };

  it('should render successfully', () => {
    const { baseElement } = render(<FormInput {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should renders the label', () => {
    render(<FormInput {...defaultProps} />);

    const labelInput = screen.getByText(/password/i);
    expect(labelInput).toBeInTheDocument();
  });

  it('should toggles password visibility', () => {
    render(<FormInput {...defaultProps} />);

    const toggleButton = screen.getByAltText('show-password-icon');
    const input = screen.getByLabelText('password');

    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'password');
  });

  it('should displays error message', () => {
    render(<FormInput {...defaultProps} errorMessage={'some error'} />);

    const errorMessage = screen.getByText('some error');
    expect(errorMessage).toBeInTheDocument();
  });
});
