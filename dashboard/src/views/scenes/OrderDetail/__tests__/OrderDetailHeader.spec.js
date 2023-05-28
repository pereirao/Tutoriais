import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import OrderDetailHeader from '../OrderDetailHeader';

// TODO: add NavigationRow unconnected

it('renders correctly', () => {
  expect(shallow(<OrderDetailHeader order={order_factory.build()} />)).toMatchSnapshot();
});

it('renders gift order correctly', () => {
  expect(shallow(<OrderDetailHeader order={order_factory.build('gift')} />)).toMatchSnapshot();
});
