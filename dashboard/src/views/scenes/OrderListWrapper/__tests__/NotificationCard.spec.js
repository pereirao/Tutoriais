import React from 'react';

import comment_factory from '../../../../business/comment/__tests__/comment.factory';
import order_factory from '../../../../business/order/__tests__/order.factory';
// NOTE: the named import is not connected to the redux store
import { NotificationCard } from '../NotificationCard';

it('renders comment card correctly', () => {
  const comment = comment_factory.build();
  const order = order_factory.build();
  expect(shallow(
    <NotificationCard notification_type="comment" order={order} comment={comment} />
  )).toMatchSnapshot();
});

it('renders unconfirmed card correctly', () => {
  const order = order_factory.build('paid');
  expect(shallow(
    <NotificationCard notification_type="unconfirmed" order={order} />
  )).toMatchSnapshot();
});
