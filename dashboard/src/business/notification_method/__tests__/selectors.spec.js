import {
  allIds,
  isFetching,
  updatingId,
  createNotificationMethodErrors,
  isCreating,
  successfullyCreated
} from '../selectors';

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

describe('updatingId', () => {
  it('returns id of the notification method that is updating', () => {
    const state = { updating_id: 1 };
    expect(updatingId(state)).toEqual(1);
  });
});

describe('allIds', () => {
  it('returns all notification method ids', () => {
    const state = { all_ids: [1, 2, 3] };
    expect(allIds(state)).toEqual([1, 2, 3]);
  });
});

describe('createNotificationMethodError', () => {
  it('returns the errors returned from the last notification method fetch or update', () => {
    const state = { create_notification_method_errors: ['this is an error'] };
    expect(createNotificationMethodErrors(state)).toEqual(['this is an error']);
  });
});

describe('isCreating', () => {
  it('returns whether or not currently creating notification method', () => {
    const state = { is_creating: true };
    expect(isCreating(state)).toEqual(true);
  });
});

describe('successfullyCreated', () => {
  it('returns whether or not successfully created notification method', () => {
    const state = { successfully_created: true };
    expect(successfullyCreated(state)).toEqual(true);
  });
});
