
import { makeSuccessAction, makeErrorAction, makeLoadingAction } from '../../utils/create_actions_for_request';
import I18n from '../../../localization';
import notificationMethodReducer, {
  byIdReducer,
  allIdsReducer,
  isFetchingReducer,
  updatingIdReducer,
  isCreatingReducer,
  createNotificationMethodErrorsReducer,
  successfullyCreatedReducer
} from '../reducer';
import { resetNewNotificationMethodForm } from '../actions';
import notification_method_factory from './notification_method.factory';

export default notificationMethodReducer;
const notificationMethodFetchLoading = makeLoadingAction('NOTIFICATION_METHOD:FETCH');
const notificationMethodFetchSuccess = makeSuccessAction('NOTIFICATION_METHOD:FETCH');
const notificationMethodFetchError = makeErrorAction('NOTIFICATION_METHOD:FETCH');
const notificationMethodCreateLoading = makeLoadingAction('NOTIFICATION_METHOD:CREATE');
const notificationMethodCreateSuccess = makeSuccessAction('NOTIFICATION_METHOD:CREATE');
const notificationMethodCreateError = makeErrorAction('NOTIFICATION_METHOD:CREATE');
const notificationMethodUpdateLoading = makeLoadingAction('NOTIFICATION_METHOD:UPDATE');
const notificationMethodUpdateSuccess = makeSuccessAction('NOTIFICATION_METHOD:UPDATE');
const notificationMethodUpdateError = makeErrorAction('NOTIFICATION_METHOD:UPDATE');
const notificationMethodDestroySuccess = makeSuccessAction('NOTIFICATION_METHOD:DESTROY');

describe('notificationMethodReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(notificationMethodReducer(undefined, {}))).toEqual([
      'by_id',
      'all_ids',
      'is_fetching',
      'updating_id',
      'is_creating',
      'create_notification_method_errors',
      'successfully_created'
    ]);
  });

  describe('byIdReducer', () => {
    const notificationMethod = notification_method_factory.build({id: 1});
    const normalized_notification_method = notification_method_factory.normalize(notificationMethod);

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles NOTIFICATION_METHOD:FETCH__SUCCESS', () => {
      const { entities } = normalized_notification_method;
      const action = notificationMethodFetchSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: notificationMethod});
    });

    it('handles NOTIFICATION_METHOD:CREATE__SUCCESS', () => {
      const new_notification_method = notification_method_factory.build({id: 2});
      const normalized_new_notification_method = notification_method_factory.normalize(new_notification_method);
      const { entities } = normalized_new_notification_method;
      const action = notificationMethodCreateSuccess({entities});
      expect(byIdReducer({1: notificationMethod}, action)).toEqual({1: notificationMethod, 2: new_notification_method});
    });

    it('handles NOTIFICATION_METHOD:UPDATE__SUCCESS', () => {
      const edited_notification_method = notification_method_factory.build({id: 1});
      const normalized_edited_notification_method = notification_method_factory.normalize(edited_notification_method);
      const { entities } = normalized_edited_notification_method;
      const action = notificationMethodUpdateSuccess({entities});
      expect(byIdReducer({1: notificationMethod}, action)).toEqual({1: edited_notification_method});
    });

    it('handles NOTIFICATION_METHOD:DESTROY__SUCCESS', () => {
      const action = notificationMethodDestroySuccess({result: 1});
      expect(byIdReducer({1: notificationMethod, 2: notificationMethod}, action)).toEqual({2: notificationMethod});
    });
  });

  describe('allIdsReducer', () => {
    it('returns the initial state', () => {
      expect(allIdsReducer(undefined, {})).toEqual([]);
    });

    it('handles NOTIFICATION_METHOD:FETCH__SUCCESS', () => {
      const action = notificationMethodFetchSuccess({result: [1, 2, 3]});
      expect(allIdsReducer([], action)).toEqual([1, 2, 3]);
    });

    it('handles NOTIFICATION_METHOD:CREATE__SUCCESS', () => {
      const action = notificationMethodCreateSuccess({result: 1});
      expect(allIdsReducer([2, 3], action)).toEqual([2, 3, 1]);
    });

    it('handles NOTIFICATION_METHOD:DESTROY__SUCCESS', () => {
      const action = notificationMethodDestroySuccess({result: 1});
      expect(allIdsReducer([1, 2, 3], action)).toEqual([2, 3]);
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles NOTIFICATION_METHOD:FETCH__LOADING', () => {
      const action = notificationMethodFetchLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles NOTIFICATION_METHOD:FETCH__SUCCESS', () => {
      const action = notificationMethodFetchSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles NOTIFICATION_METHOD:FETCH__ERROR', () => {
      const action = notificationMethodFetchError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });

  describe('updatingIdReducer', () => {
    it('returns the initial state', () => {
      expect(updatingIdReducer(undefined, {})).toEqual(null);
    });

    it('handles NOTIFICATION_METHOD:UPDATE__LOADING', () => {
      const action = notificationMethodUpdateLoading({id: 1}, {result: null});
      expect(updatingIdReducer(null, action)).toEqual(1);
    });
    it('handles NOTIFICATION_METHOD:UPDATE__SUCCESS', () => {
      const action = notificationMethodUpdateSuccess();
      expect(updatingIdReducer(null, action)).toEqual(null);
    });
    it('handles NOTIFICATION_METHOD:UPDATE__ERROR', () => {
      const action = notificationMethodUpdateError();
      expect(updatingIdReducer(null, action)).toEqual(null);
    });
  });

  describe('isCreatingReducer', () => {
    it('returns the initial state', () => {
      expect(isCreatingReducer(undefined, {})).toEqual(false);
    });

    it('handles NOTIFICATION_METHOD:CREATE__LOADING', () => {
      const action = notificationMethodCreateLoading();
      expect(isCreatingReducer(false, action)).toEqual(true);
    });
    it('handles NOTIFICATION_METHOD:CREATE__SUCCESS', () => {
      const action = notificationMethodCreateSuccess();
      expect(isCreatingReducer(true, action)).toEqual(false);
    });
    it('handles NOTIFICATION_METHOD:CREATE__ERROR', () => {
      const action = notificationMethodCreateError();
      expect(isCreatingReducer(true, action)).toEqual(false);
    });
  });

  describe('successfullyCreatedReducer', () => {
    it('returns the initial state', () => {
      expect(successfullyCreatedReducer(undefined, {})).toEqual(false);
    });

    it('handles NOTIFICATION_METHOD:CREATE__SUCCESS', () => {
      const action = notificationMethodCreateSuccess();
      expect(successfullyCreatedReducer(false, action)).toEqual(true);
    });
    it('handles NOTIFICATION_METHOD:CREATE__ERROR', () => {
      const action = notificationMethodCreateError();
      expect(successfullyCreatedReducer(true, action)).toEqual(false);
    });
    it('handles NOTIFICATION_METHOD:RESET_NEW_NOTIFICATION_METHOD_FORM', () => {
      const action = resetNewNotificationMethodForm();
      expect(successfullyCreatedReducer(true, action)).toEqual(false);
    });
  });

  describe('createNotificationMethodErrorsReducer', () => {
    it('returns the initial state', () => {
      expect(createNotificationMethodErrorsReducer(undefined, {})).toEqual([]);
    });

    it('handles NOTIFICATION_METHOD:CREATE__ERROR', () => {
      const action = notificationMethodCreateError({error: 'Internal Server Error'});
      expect(createNotificationMethodErrorsReducer([], action)).toEqual([I18n.t('form.error.invalid')]);
    });
    it('handles NOTIFICATION_METHOD:RESET_NEW_NOTIFICATION_METHOD_FORM', () => {
      const action = resetNewNotificationMethodForm();
      expect(createNotificationMethodErrorsReducer(['random error'], action)).toEqual([]);
    });
  });
});
