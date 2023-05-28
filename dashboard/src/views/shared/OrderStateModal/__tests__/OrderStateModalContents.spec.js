import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import OrderStateModalContents from '../OrderStateModalContents';

it('renders correctly', () => {
  expect(shallow(<OrderStateModalContents order={order_factory.build()} />)).toMatchSnapshot();
});
