import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
// NOTE: the named export isn't a connected component
import { UpdateStateButton } from '../index';

it('renders inline correctly', () => {
  expect(shallow(<UpdateStateButton inline order={order_factory.build()} />)).toMatchSnapshot();
});
it('renders non-inline correctly', () => {
  expect(shallow(<UpdateStateButton inline={false} order={order_factory.build()} />)).toMatchSnapshot();
});
