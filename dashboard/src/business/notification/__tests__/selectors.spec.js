import { displayOrder, totalCount } from '../selectors';

// Note that I'm testing the local versions of these selectors

describe('displayOrder', () => {
  it('returns false if the comment is not', () => {
    const state = { display_order: ['id1', 'id2'] };
    expect(displayOrder(state)).toEqual(['id1', 'id2']);
  });
});

describe('totalCount', () => {
  it('returns false if the comment is not', () => {
    const state = { display_order: ['id1', 'id2'] };
    expect(totalCount(state)).toEqual(2);
  });
});
