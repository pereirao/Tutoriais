import React from 'react';

import DeliveryEstimateField from '../DeliveryEstimateField';

it('renders correctly', () => {
  expect(shallow(<DeliveryEstimateField />)).toMatchSnapshot();
});
