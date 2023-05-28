import React from 'react';

// NOTE: the named export isn't a connected component
import { NewNotificationMethodButton } from '../NewNotificationMethodButton';

it('renders correctly', () => {
  expect(shallow(<NewNotificationMethodButton />)).toMatchSnapshot();
});
