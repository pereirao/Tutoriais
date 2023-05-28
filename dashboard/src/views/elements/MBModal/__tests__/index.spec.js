import React from 'react';

import MBModal from '../index';

it('renders correctly', () => {
  expect(shallow(<MBModal />)).toMatchSnapshot();
});
