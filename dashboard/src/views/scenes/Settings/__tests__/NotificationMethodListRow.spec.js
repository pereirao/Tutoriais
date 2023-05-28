import React from 'react';
import { NotificationMethodListRow } from '../NotificationMethodListRow';
import { notification_method_helpers } from '../../../../business/notification_method';
// import notification_method_factory from '../../../../business/notification_method/__tests__/notification_method.factory';

const { NOTIFICATION_METHODS_COLUMN_ORDER } = notification_method_helpers;
const NOTIFICATION_METHOD = {
  id: 10,
  active: true,
  label: 'this_is_a_label',
  type: 'sms'
};

it('renders correctly', () => {
  expect(shallow(<NotificationMethodListRow
    key={NOTIFICATION_METHOD.id}
    columns={NOTIFICATION_METHODS_COLUMN_ORDER}
    notification_method={NOTIFICATION_METHOD} />
  )).toMatchSnapshot();
});
