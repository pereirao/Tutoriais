import React from 'react';

import MissingNameCheckbox from '../MissingNameCheckbox';

it('renders correctly', () => {
  expect(shallow(<MissingNameCheckbox />)).toMatchSnapshot();
});
