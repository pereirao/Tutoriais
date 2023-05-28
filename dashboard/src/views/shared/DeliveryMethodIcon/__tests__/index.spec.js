import React from 'react';

import DeliveryMethodIcon from '../index';

it('renders shipped correctly', () => {
  expect(
    shallow(<DeliveryMethodIcon type="shipped" />)
  ).toMatchSnapshot();
});

it('renders pickup correctly', () => {
  expect(
    shallow(<DeliveryMethodIcon type="pickup" />)
  ).toMatchSnapshot();
});

it('renders on_demand correctly', () => {
  expect(
    shallow(<DeliveryMethodIcon type="on_demand" />)
  ).toMatchSnapshot();
});
