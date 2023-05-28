import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import ReportProblemModalContents from '../ReportProblemModalContents';

it('renders correctly', () => {
  expect(shallow(<ReportProblemModalContents order={order_factory.build()} />)).toMatchSnapshot();
});
