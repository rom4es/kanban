import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilter } from '../../store/slices/kanban';
import { DueFilterType } from '../../store/slices/kanban/types';
import './styles.scss';

interface DueFilterProps {}

const DueFilter: React.FC<DueFilterProps> = () => {
  const { dueFilter } = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const filters = [
    {
      name: 'Все',
      value: DueFilterType.All,
    },
    {
      name: 'Просроченные',
      value: DueFilterType.Overdue,
    },
    {
      name: 'На сегодня',
      value: DueFilterType.Today,
    },
  ];

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeFilter({
        newValue: e.target.value as DueFilterType,
      })
    );
  };

  return (
    <div className="b-filter">
      {filters.map((filter) => (
        <div className="b-filter-item" key={filter.value}>
          <input
            type="radio"
            value={filter.value}
            checked={dueFilter === filter.value}
            onChange={onChangeFilter}
            id={`filter-${filter.value}`}
          />
          <label htmlFor={`filter-${filter.value}`}>{filter.name}</label>
        </div>
      ))}
    </div>
  );
};

export default DueFilter;
