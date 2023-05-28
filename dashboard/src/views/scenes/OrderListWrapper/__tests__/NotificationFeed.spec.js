import React from 'react';

import notification_factory from '../../../../business/notification/__tests__/notification.factory';
// NOTE: the named import is not connected to the redux store
import { NotificationFeed } from '../NotificationFeed';

it('renders feed correctly', () => {
  expect(shallow(<NotificationFeed notifications={[notification_factory.build({id: 1}), notification_factory.build({id: 2})]} />)).toMatchSnapshot();
});
