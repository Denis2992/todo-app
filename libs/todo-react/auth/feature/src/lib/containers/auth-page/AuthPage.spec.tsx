import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import AuthPage from './AuthPage';

describe('AuthPageWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthPage>
        <p>content</p>
      </AuthPage>
    );
    expect(baseElement).toBeTruthy();
  });
});
