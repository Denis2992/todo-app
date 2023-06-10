import { render } from '@testing-library/react';

import TodoApp from './TodoApp';

describe('TodoApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoApp />);
    expect(baseElement).toBeTruthy();
  });
});
