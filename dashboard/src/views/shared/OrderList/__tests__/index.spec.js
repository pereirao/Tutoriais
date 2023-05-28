import React from 'react';

// NOTE: the named export isn't a connected component
import { OrderList } from '../index';
import { EMPTY_FILTERS } from '../../../../business/order/reducer';
import order_factory from '../../../../business/order/__tests__/order.factory';

it('renders correctly', () => {
  expect(
    shallow(<OrderList
      fetch={() => {}}
      applied_filters={EMPTY_FILTERS}
      orders={[order_factory.build({id: 1}), order_factory.build({id: 2})]}
      list_name="active" />
    )
  ).toMatchSnapshot();
});
