import React from 'react';
import { EditNotificationMethodForm } from '../EditNotificationMethodForm';
import notification_method_factory from '../../../../business/notification_method/__tests__/notification_method.factory';


it('renders correctly', () => {
  expect(shallow(<EditNotificationMethodForm notification_method={notification_method_factory.build()} />)).toMatchSnapshot();
});
