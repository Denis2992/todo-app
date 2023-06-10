import { render } from '@testing-library/react';

import AuthPageWrapper from './AuthPageWrapper';

describe('AuthPageWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthPageWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
