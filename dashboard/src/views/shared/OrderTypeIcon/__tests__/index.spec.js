import React from 'react';

import OrderTypeIcon from '../index';

it('renders correctly for scheduled type', () => {
  expect(shallow(<OrderTypeIcon type="scheduled" />)).toMatchSnapshot();
});
it('renders correctly for shipped type', () => {
  expect(shallow(<OrderTypeIcon type="shipped" />)).toMatchSnapshot();
});
it('renders correctly for pickup type', () => {
  expect(shallow(<OrderTypeIcon type="pickup" />)).toMatchSnapshot();
});
it('renders correctly for on_demand type', () => {
  expect(shallow(<OrderTypeIcon type="on_demand" />)).toMatchSnapshot();
});
