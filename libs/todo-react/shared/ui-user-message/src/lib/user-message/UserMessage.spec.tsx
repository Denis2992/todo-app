import { render } from '@testing-library/react';

import UserMessage from './UserMessage';

describe('UserMessage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserMessage />);
    expect(baseElement).toBeTruthy();
  });
});
