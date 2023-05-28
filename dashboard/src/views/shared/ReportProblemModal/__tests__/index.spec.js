import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import ReportProblemModal from '../index';

it('renders correctly', () => {
  expect(shallow(<ReportProblemModal hidden={false} order={order_factory.build()} />)).toMatchSnapshot();
});
