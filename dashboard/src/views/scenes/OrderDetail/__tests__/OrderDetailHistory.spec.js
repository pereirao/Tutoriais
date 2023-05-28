import React from 'react';
import order_factory from '../../../../business/order/__tests__/order.factory';

// NOTE: the named export isn't a connected component
import OrderDetailHistory from '../OrderDetailHistory';

it('renders correctly', () => {
  expect(shallow(
    <OrderDetailHistory order={order_factory.build()} />
  )).toMatchSnapshot();
});
