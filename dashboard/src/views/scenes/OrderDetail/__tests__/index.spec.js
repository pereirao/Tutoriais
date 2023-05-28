import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
// NOTE: the named export isn't a connected component
import { OrderDetail } from '../index';

it('renders correctly', () => {
  expect(shallow(<OrderDetail order={order_factory.build()} />)).toMatchSnapshot();
});
