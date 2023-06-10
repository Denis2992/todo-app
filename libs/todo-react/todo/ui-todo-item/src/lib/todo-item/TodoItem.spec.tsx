import { render } from '@testing-library/react';

import TodoItem from './TodoItem';

describe('TodoItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoItem />);
    expect(baseElement).toBeTruthy();
  });
});
