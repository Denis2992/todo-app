import { render } from '@testing-library/react';

import ThemeContext from './ThemeContext';

describe('ThemeContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeContext />);
    expect(baseElement).toBeTruthy();
  });
});
