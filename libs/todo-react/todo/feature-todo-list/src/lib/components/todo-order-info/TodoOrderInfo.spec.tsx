import { render } from '@testing-library/react';

import TodoOrderInfo from './TodoOrderInfo';

describe('TodoOrderInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoOrderInfo />);
    expect(baseElement).toBeTruthy();
  });
});
