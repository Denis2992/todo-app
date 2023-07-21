import { useContext } from 'react';
import classNames from 'classnames';

import styles from './FilterBar.module.scss';
import { ThemeContext } from '@todo-react/shared/store';
import { FilterType } from '@todo-app/shared/domain';

export interface FilterBarProps {
  activeFilter: FilterType;
  filterChanged: (activeFilter: FilterType) => void;
}

export function FilterBar(props: FilterBarProps) {
  const filterVariants: FilterType[] = [
    FilterType.ALL,
    FilterType.ACTIVE,
    FilterType.COMPLETED,
  ];
  const { theme } = useContext(ThemeContext);

  const isFilterActive = (variant: FilterType) => {
    return variant === props.activeFilter
      ? styles['filter-bar__filter-option--active']
      : '';
  };

  const onFilterClick = (variant: FilterType) => {
    if (variant === props.activeFilter) {
      return;
    } else {
      props.filterChanged(variant);
    }
  };

  return (
    <div
      className={classNames(
        styles['filter-bar'],
        styles[`filter-bar--${theme}`]
      )}
    >
      {filterVariants.map((variant, index) => (
        <button
          key={index}
          className={classNames(
            styles['filter-bar__filter-option'],
            styles[`filter-bar__filter-option--${theme}`],
            isFilterActive(variant)
          )}
          onClick={() => {
            onFilterClick(variant);
          }}
        >
          {variant}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
