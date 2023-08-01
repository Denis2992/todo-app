import { render } from '@testing-library/react';

import TodoBar from './TodoBar';

describe('TodoBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoBar />);
    expect(baseElement).toBeTruthy();
  });
});
