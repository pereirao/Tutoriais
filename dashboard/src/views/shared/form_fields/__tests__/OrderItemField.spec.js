import React from 'react';

import OrderItemField from '../OrderItemField';
import order_factory from '../../../../business/order/__tests__/order.factory';

it('renders correctly', () => {
  const order = order_factory.build('with_order_items');
  expect(shallow(<OrderItemField order={order} />)).toMatchSnapshot();
});
