import React from 'react';
import { NewNotificationMethodForm } from '../NewNotificationMethodForm';


it('renders correctly', () => {
  expect(shallow(<NewNotificationMethodForm createNotificationMethod={() => null} />)).toMatchSnapshot();
});
