import { makeSuccessAction, makeErrorAction } from '../../utils/create_actions_for_request';
import uiReducer, { orderStateModalIdReducer, forceRefreshModalReducer } from '../reducer';
import { openOrderStateModal, closeOrderStateModal, forceRefresh } from '../actions';

const updateOrderSuccess = makeSuccessAction('ORDER:UPDATE_ORDER');
const updateOrderError = makeErrorAction('ORDER:UPDATE_ORDER');

describe('uiReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(uiReducer(undefined, {}))).toEqual(['order_state_modal_id', 'force_refresh_modal_open']);
  });

  describe('orderStateModalIdReducer', () => {
    it('returns the initial state', () => {
      expect(orderStateModalIdReducer(undefined, {})).toEqual(null);
    });

    it('handles UI:OPEN_ORDER_STATE_MODAL', () => {
      const action = openOrderStateModal('orderid1');
      expect(orderStateModalIdReducer(null, action)).toEqual('orderid1');
    });

    it('handles UI:CLOSE_ORDER_STATE_MODAL', () => {
      const action = closeOrderStateModal();
      expect(orderStateModalIdReducer('orderid1', action)).toEqual(null);
    });

    it('handles ORDER:UPDATE_ORDER__SUCCESS', () => {
      const action = updateOrderSuccess({});
      expect(orderStateModalIdReducer('orderid1', action)).toEqual(null);
    });

    it('handles ORDER:UPDATE_ORDER__ERROR', () => {
      const action = updateOrderError({});
      expect(orderStateModalIdReducer('orderid1', action)).toEqual(null);
    });
  });


  describe('forceRefreshModalReducer', () => {
    it('returns the initial state', () => {
      expect(forceRefreshModalReducer(undefined, {})).toEqual(false);
    });

    it('handles UI:FORCE_REFRESH', () => {
      const action = forceRefresh();
      expect(forceRefreshModalReducer(undefined, action)).toEqual(true);
    });
  });
});
