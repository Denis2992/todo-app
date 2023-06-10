import { render } from '@testing-library/react';

import TodoPage from './TodoPage';

describe('TodoPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoPage />);
    expect(baseElement).toBeTruthy();
  });
});
