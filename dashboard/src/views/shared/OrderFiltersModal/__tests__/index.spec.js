import React from 'react';
import moment from 'moment';
import OrderFilters from '../index';

it('renders correctly', () => {
  const all_filters = {
    start_date: moment('2017-01-01'),
    end_date: moment('2017-01-02'),
    types: ['delivery', 'shipping', 'pickup'],
    attributes: ['vip', 'gift', 'scheduled', 'exception']
  };
  expect(
    shallow(<OrderFilters initial_filters={all_filters} />)
  ).toMatchSnapshot();
});
