import React from 'react';

import DriverField from '../DriverField';

it('renders correctly', () => {
  expect(shallow(<DriverField />)).toMatchSnapshot();
});
