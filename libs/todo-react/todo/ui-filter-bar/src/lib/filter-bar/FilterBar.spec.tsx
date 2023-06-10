import { render } from '@testing-library/react';

import FilterBar from './FilterBar';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterBar />);
    expect(baseElement).toBeTruthy();
  });
});
