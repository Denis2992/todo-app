import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { ThemeContext, ThemeProvider } from './ThemeContext';

describe('ThemeContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeProvider children={<div />} />);
    expect(baseElement).toBeTruthy();
  });

  it('initializes with LIGHT theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <div data-testid="theme">{theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );
    const theme = getByTestId('theme');
    expect(theme).toHaveTextContent('light');
  });

  it('changes theme when button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ changeTheme, theme }) => (
            <button data-testid="change-button" onClick={() => changeTheme()}>
              {theme}
            </button>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const changeButton = getByTestId('change-button');

    fireEvent.click(changeButton);

    expect(changeButton).toHaveTextContent('dark');
  });
});
