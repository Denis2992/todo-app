import { render } from '@testing-library/react';
import 'matchmedia-polyfill';

import TodoApp from './TodoApp';

describe('TodoApp', () => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

  it('should render successfully', async () => {
    const { baseElement } = render(<TodoApp />);
    expect(baseElement).toBeTruthy();
  });
});
