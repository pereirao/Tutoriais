import React from 'react';

// NOTE: the named export isn't a connected component
import AppliedFilters from '../AppliedFilters';
import { order_helpers } from '../../../../business/order';

it('renders correctly', () => {
  const filters = {
    date_range: {start: 'fake_timestamp', end: 'other_fake_timestamp'},
    delivery_method_types: ['on_demand'],
    attributes: ['gift']
  };
  expect(
    shallow(<AppliedFilters query="query" filters={order_helpers.appliedFiltersArray(filters)} />)
  ).toMatchSnapshot();
});
