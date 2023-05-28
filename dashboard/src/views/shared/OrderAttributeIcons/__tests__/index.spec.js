import React from 'react';

import OrderAttributeIcons from '../index';

it('renders correctly', () => {
  const attributes = ['gift', 'vip', 'scheduled'];
  expect(
    shallow(<OrderAttributeIcons attributes={attributes} />)
  ).toMatchSnapshot();
});
