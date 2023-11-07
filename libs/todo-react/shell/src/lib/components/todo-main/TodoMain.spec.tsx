import { render } from '@testing-library/react';

import TodoMain from './TodoMain';
import { MemoryRouter } from 'react-router-dom';

describe('TodoMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoMain />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});
