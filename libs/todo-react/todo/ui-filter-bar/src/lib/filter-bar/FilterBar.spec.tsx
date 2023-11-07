import { fireEvent, render } from '@testing-library/react';

import FilterBar, { FilterBarProps } from './FilterBar';
import { FilterType } from '@todo-app/shared/domain';

const filterBarProps: FilterBarProps = {
  activeFilter: FilterType.ALL,
  filterChanged: jest.fn(),
};

describe('FilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterBar {...filterBarProps} />);
    expect(baseElement).toBeTruthy();
  });

  describe('onFilterClick', () => {
    it('should not call filterChanged when filter did not changed', () => {
      const { getByText } = render(<FilterBar {...filterBarProps} />);

      const allFilterBtn = getByText('All');

      fireEvent.click(allFilterBtn);

      expect(filterBarProps.filterChanged).not.toHaveBeenCalled();
    });

    it('should call filterChanged when filter changed', () => {
      const { getByText } = render(<FilterBar {...filterBarProps} />);

      const completedFilterBtn = getByText('Completed');

      fireEvent.click(completedFilterBtn);

      expect(filterBarProps.filterChanged).toHaveBeenCalled();
    });
  });
});
