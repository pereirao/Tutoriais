import React from 'react';
import NewNotificationMethodModal from '../NewNotificationMethodModal';

it('renders correctly', () => {
  expect(shallow(<NewNotificationMethodModal />)).toMatchSnapshot();
});
