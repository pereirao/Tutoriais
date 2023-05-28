import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import ReportProblemButton from '../ReportProblemButton';

it('renders correctly', () => {
  expect(shallow(<ReportProblemButton order={order_factory.build()} visible />)).toMatchSnapshot();
});
