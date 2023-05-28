import { allIds, isFetching, isUpdating } from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('isFetching', () => {
  it('returns true if the notification method is fetching', () => {
    const state = { is_fetching: true };
    expect(isFetching(state)).toEqual(true);
  });

  it('returns false if the notification method is not', () => {
    const state = { is_fetching: false };
    expect(isFetching(state)).toEqual(false);
  });
});

describe('isUpdating', () => {
  it('returns true if the notification method is updating', () => {
    const state = { is_updating: true };
    expect(isUpdating(state)).toEqual(true);
  });

  it('returns undefined if the notification method is not', () => {
    const state = { is_updating: undefined };
    expect(isFetching(state)).toEqual(undefined);
  });
});

describe('allIds', () => {
  it('returns all notification method ids', () => {
    const state = { all_ids: [1, 2, 3] };
    expect(allIds(state)).toEqual([1, 2, 3]);
  });
});

