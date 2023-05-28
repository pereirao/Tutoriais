import {
  listIds,
  totalPages,
  totalCount,
  nextPage,
  query,
  filters,
  isFetching,
  isUpdating
} from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('isFetching', () => {
  it('returns true if the variant is fetching', () => {
    const state = { is_fetching: true };
    expect(isFetching(state)).toEqual(true);
  });

  it('returns false if the variant is not', () => {
    const state = { is_fetching: false };
    expect(isFetching(state)).toEqual(false);
  });
});

describe('isUpdating', () => {
  it('returns true if the variant is updating', () => {
    const state = { is_updating: true };
    expect(isUpdating(state)).toEqual(true);
  });

  it('returns undefined if the variant is not', () => {
    const state = { is_updating: undefined };
    expect(isFetching(state)).toEqual(undefined);
  });
});

describe('listIds', () => {
  it('returns list variant ids', () => {
    const state = { list_ids: [1, 2, 3] };
    expect(listIds(state)).toEqual([1, 2, 3]);
  });
});

describe('totalPages', () => {
  it('returns total page count', () => {
    const state = { total_pages: 1 };
    expect(totalPages(state)).toEqual(1);
  });
});

describe('totalCount', () => {
  it('returns total variant count across all pages', () => {
    const state = { total_count: 10 };
    expect(totalCount(state)).toEqual(10);
  });
});

describe('nextPage', () => {
  it('returns next page number', () => {
    const state = { next_page: 2 };
    expect(nextPage(state)).toEqual(2);
  });
});

describe('query', () => {
  it('returns current query', () => {
    const state = { query: 'beer' };
    expect(query(state)).toEqual('beer');
  });
});

describe('filters', () => {
  it('returns current filters', () => {
    const state = { filters: {in_stock: true} };
    expect(filters(state)).toEqual({in_stock: true});
  });
});

