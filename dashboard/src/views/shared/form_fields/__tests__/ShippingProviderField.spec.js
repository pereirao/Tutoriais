import React from 'react';

import ShippingProviderField from '../ShippingProviderField';

it('renders correctly', () => {
  expect(shallow(<ShippingProviderField />)).toMatchSnapshot();
});
