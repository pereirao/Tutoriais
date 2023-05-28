import { orderList, isFetching } from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('orderList', () => {
  it('returns specified order list', () => {
    const state = { all: {name: 'stubbed_list'} };
    expect(orderList(state, 'all')).toEqual({name: 'stubbed_list'});
  });
});

describe('isFetching', () => {
  it('returns true if fetching order', () => {
    const state = { is_fetching: true };
    expect(isFetching(state)).toEqual(true);
  });
});
