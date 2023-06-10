import { render } from '@testing-library/react';

import TodoMain from './TodoMain';

describe('TodoMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoMain />);
    expect(baseElement).toBeTruthy();
  });
});
