import React from 'react';

import { comment_helpers } from '../../../../business/comment';
import comment_factory from '../../../../business/comment/__tests__/comment.factory';
import { order_helpers } from '../../../../business/order';
import order_factory from '../../../../business/order/__tests__/order.factory';
// NOTE: the named export isn't a connected component
import { OrderTimeline, OrderTimelineEntry } from '../OrderTimeline';

const { orderStateTimelineEntries } = order_helpers;

//TODO: make specs for all cases of Entry when they're laid out

it('renders OrderTimeline correctly', () => {
  const comment = comment_factory.build({id: 1});
  expect(shallow(
    <OrderTimeline
      comment_timeline_entries={comment_helpers.commentTimelineEntries([comment])}
      order={order_factory.build({comments: [comment]})} />
  )).toMatchSnapshot();
});

it('renders OrderTimelineEntry correctly', () => {
  const order = order_factory.build('paid');
  expect(shallow(<OrderTimelineEntry entry={orderStateTimelineEntries(order)[0]} />)).toMatchSnapshot();
});
