import { isFetching } from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('isFetching', () => {
  it('returns true if the comment is fetching', () => {
    const state = { is_fetching: true };
    expect(isFetching(state)).toEqual(true);
  });

  it('returns false if the comment is not', () => {
    const state = { is_fetching: false };
    expect(isFetching(state)).toEqual(false);
  });
});

