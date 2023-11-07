import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';
import { ThemeType } from '@todo-react/shared/domain';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button type="button">Click me</Button>);
    expect(baseElement).toBeTruthy();
  });

  it('onClickHandler should call props.onClick when one did passed', () => {
    const handleClick = jest.fn();
    render(
      <Button type="button" onClick={handleClick}>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should has the correct class based on theme prop', () => {
    const { container, rerender } = render(
      <Button type="button" theme={ThemeType.LIGHT}>
        Click me
      </Button>
    );

    expect(container.firstChild).toHaveClass('cta cta--light');

    rerender(
      <Button type="button" theme={ThemeType.DARK}>
        Click me
      </Button>
    );

    expect(container.firstChild).toHaveClass('cta cta--dark');
  });

  it('should has gradient class when gradient prop is true', () => {
    const { container, rerender } = render(
      <Button type="button" gradient>
        Click me
      </Button>
    );

    expect(container.firstChild).toHaveClass('cta cta--gradient');

    rerender(
      <Button type="button" gradient={false}>
        Click me
      </Button>
    );

    expect(container.firstChild).not.toHaveClass('cta--gradient');
  });
});
