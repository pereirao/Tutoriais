import React from 'react';

import TrackingNumberField from '../TrackingNumberField';

it('renders correctly', () => {
  expect(shallow(<TrackingNumberField />)).toMatchSnapshot();
});
