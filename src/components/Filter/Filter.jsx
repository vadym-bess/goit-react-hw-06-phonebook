import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { searchAction } from 'redux/filter.slice';

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter.filter);

  const changeFilter = e => {
    dispatch(searchAction(e.currentTarget.value));
  };

  return (
    <label className={clsx(css.formThumb)}>
      Find contacts by name
      <input type="text" value={filter} onChange={changeFilter} />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
