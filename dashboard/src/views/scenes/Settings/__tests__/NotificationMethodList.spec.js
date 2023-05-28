import React from 'react';
import { NotificationMethodList } from '../NotificationMethodList';
import notification_method_factory from '../../../../business/notification_method/__tests__/notification_method.factory';


it('renders correctly', () => {
  expect(shallow(<NotificationMethodList fetchNotificationMethods={() => null} notification_methods={[notification_method_factory.build(), notification_method_factory.build()]} />)).toMatchSnapshot();
});
