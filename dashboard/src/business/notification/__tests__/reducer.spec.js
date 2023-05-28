/* eslint import/first: 0 */

jest.mock('uuid');

import { v4 as uuid } from 'uuid';
import { makeSuccessAction } from '../../utils/create_actions_for_request';
import order_factory from '../../order/__tests__/order.factory';
import notificationReducer, { byIdReducer, displayOrderReducer } from '../reducer';
import { pushNotification, removeNotification } from '../actions';

const pingSuccess = makeSuccessAction('SESSION:PING');
const orderFetchOrderSuccess = makeSuccessAction('ORDER:FETCH_ORDER');
const updateOrderSuccess = makeSuccessAction('ORDER:UPDATE_ORDER');

describe('notificationReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(notificationReducer(undefined, {}))).toEqual([
      'by_id',
      'display_order'
    ]);
  });

  describe('byIdReducer', () => {
    const order = order_factory.build('shipped', {id: '1', state: 'paid'});
    const normalized_order = order_factory.normalize(order);
    const { entities } = normalized_order;
    const notification = { id: 'unconfirmed_1', order_id: '1', notification_type: 'unconfirmed' };

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles SESSION:PING__SUCCESS', () => {
      const action = pingSuccess({unconfirmed_shipments: ['1']});
      expect(byIdReducer({}, action)).toEqual({unconfirmed_1: notification});
    });

    it('handles ORDER:FETCH_ORDER__SUCCESS', () => {
      const action = orderFetchOrderSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({unconfirmed_1: notification});
    });

    it('handles ORDER:UPDATE_ORDER__SUCCESS', () => {
      const action = updateOrderSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({unconfirmed_1: notification});
    });

    it('handles NOTIFICATION:PUSH', () => {
      uuid.mockImplementation(() => 'notification_uuid');
      const action = pushNotification('comment', '1');
      expect(byIdReducer({}, action)).toEqual({
        notification_uuid: {id: 'notification_uuid', order_id: '1', notification_type: 'comment'}
      });
    });

    it('handles NOTIFICATION:REMOVE', () => {
      const action = removeNotification('notification_uuid');
      const comment_notification = { id: 'notification_uuid', order_id: '1', notification_type: 'comment' };
      expect(byIdReducer({notification_uuid: comment_notification}, action)).toEqual({});
    });
  });

  describe('displayOrderReducer', () => {
    const order = order_factory.build('shipped', {id: '1', state: 'paid'});
    const normalized_order = order_factory.normalize(order);
    const { entities, result } = normalized_order;

    it('returns the initial state', () => {
      expect(displayOrderReducer(undefined, [])).toEqual([]);
    });

    it('handles SESSION:PING__SUCCESS', () => {
      const action = pingSuccess({unconfirmed_shipments: ['1']});
      expect(displayOrderReducer([], action)).toEqual(['unconfirmed_1']);
    });

    it('handles ORDER:FETCH_ORDER__SUCCESS', () => {
      const action = orderFetchOrderSuccess({entities, result});
      expect(displayOrderReducer([], action)).toEqual(['unconfirmed_1']);
    });

    it('handles ORDER:UPDATE_ORDER__SUCCESS', () => {
      const action = updateOrderSuccess({entities, result});
      expect(displayOrderReducer([], action)).toEqual(['unconfirmed_1']);
    });

    it('handles NOTIFICATION:PUSH', () => {
      uuid.mockImplementation(() => 'notification_uuid');
      const action = pushNotification('comment', '1');
      expect(displayOrderReducer([], action)).toEqual(['notification_uuid']);
    });

    it('handles NOTIFICATION:REMOVE', () => {
      const action = removeNotification('notification_uuid');
      expect(displayOrderReducer(['notification_uuid'], action)).toEqual([]);
    });
  });
});
