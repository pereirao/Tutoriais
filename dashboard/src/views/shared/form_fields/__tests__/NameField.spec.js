import React from 'react';

import NameField from '../NameField';

it('renders correctly', () => {
  expect(shallow(<NameField />)).toMatchSnapshot();
});
