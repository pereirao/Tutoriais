import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
// NOTE: the named export isn't a connected component
import { OrderItemList } from '../OrderItemList';

it('renders correctly', () => {
  const order = order_factory.build('with_order_items');
  expect(shallow(
    <OrderItemList
      order_item_ids={[1]}
      order_items={order.order_items}
      amounts={order.amounts} />
  )).toMatchSnapshot();
});
