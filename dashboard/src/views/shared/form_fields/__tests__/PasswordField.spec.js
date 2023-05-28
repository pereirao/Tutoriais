import React from 'react';

import PasswordField from '../PasswordField';

it('renders correctly', () => {
  expect(shallow(<PasswordField />)).toMatchSnapshot();
});
