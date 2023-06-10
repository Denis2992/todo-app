import { render } from '@testing-library/react';

import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoInput />);
    expect(baseElement).toBeTruthy();
  });
});
