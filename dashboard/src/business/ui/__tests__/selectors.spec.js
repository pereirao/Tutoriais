import { orderStateModalId, isForceRefreshModalOpen } from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('orderStateModalId', () => {
  it('returns the order id of the order that is currently in the state transition modal', () => {
    const state = { order_state_modal_id: 'orderid1' };
    expect(orderStateModalId(state)).toEqual('orderid1');
  });
});

describe('isForceRefreshModalOpen', () => {
  it('returns whether or not the force update modal should be open', () => {
    const state = {force_refresh_modal_open: true};
    expect(isForceRefreshModalOpen(state)).toEqual(true);
  });
});
