
import { makeSuccessAction, makeErrorAction, makeLoadingAction, makeDoneAction } from '../../utils/create_actions_for_request';
import { READY_STATUS, LOADING_STATUS, SUCCESS_STATUS, ERROR_STATUS } from '../../utils/fetch_status';
import I18n from '../../../localization';
import sessionReducer, {
  meReducer,
  isLoggingInReducer,
  loginErrorReducer,
  isFetchingMeReducer,
  unconfirmedCountReducer,
  pollingIntervalLengthReducer,
  helpMessageStatusReducer,
  POLLING_INTERVALS
} from '../reducer';
import { signOut, clearLoginError, setPollingInterval } from '../actions';
import me_factory from './me.factory';

const authenticateLoading = makeLoadingAction('SESSION:AUTHENTICATE');

const pingSuccess = makeSuccessAction('SESSION:PING');

const fetchMeLoading = makeLoadingAction('SESSION:FETCH_ME');
const fetchMeSuccess = makeSuccessAction('SESSION:FETCH_ME');
const fetchMeError = makeErrorAction('SESSION:FETCH_ME');

const sendForHelpLoading = makeLoadingAction('SESSION:SEND_FOR_HELP');
const sendForHelpSuccess = makeSuccessAction('SESSION:SEND_FOR_HELP');
const sendForHelpError = makeErrorAction('SESSION:SEND_FOR_HELP');
const sendForHelpDone = makeDoneAction('SESSION:SEND_FOR_HELP');

// TODO: finish reducer specs for new onesu

describe('sessionReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(sessionReducer(undefined, {}))).toEqual([
      'is_fetching_me',
      'is_logging_in',
      'login_error',
      'me',
      'help_message_status',
      'polling_interval_length',
      'unconfirmed_count'
    ]);
  });

  describe('meReducer', () => {
    const me = me_factory.build();

    it('returns the initial state', () => {
      expect(meReducer(undefined, {})).toEqual(null);
    });

    it('handles SESSION:FETCH_ME__SUCCESS', () => {
      const action = fetchMeSuccess(me);
      expect(meReducer(null, action)).toEqual(me);
    });

    it('handles SESSION:SIGN_OUT', () => {
      const action = signOut();
      expect(meReducer(me, action)).toEqual(null);
    });
  });

  describe('isLoggingInReducer', () => {
    it('returns the initial state', () => {
      expect(isLoggingInReducer(undefined, {})).toEqual(false);
    });

    it('handles SESSION:AUTHENTICATE__LOADING', () => {
      const action = authenticateLoading();
      expect(isLoggingInReducer(false, action)).toEqual(true);
    });
    it('handles SESSION:FETCH_ME__SUCCESS', () => {
      const action = fetchMeSuccess();
      expect(isLoggingInReducer(true, action)).toEqual(false);
    });
    it('handles SESSION:FETCH_ME__ERROR', () => {
      const action = fetchMeError();
      expect(isLoggingInReducer(true, action)).toEqual(false);
    });
  });

  describe('loginErrorReducer', () => {
    it('returns the initial state', () => {
      expect(loginErrorReducer(undefined, {})).toEqual('');
    });

    it('handles SESSION:FETCH_ME__ERROR', () => {
      const action = fetchMeError();
      expect(loginErrorReducer('', action)).toEqual(I18n.t('system.network_error.incorrect_credentials'));
    });
    it('handles SESSION:CLEAR_LOGIN_ERROR', () => {
      const action = clearLoginError();
      expect(loginErrorReducer('fake error message', action)).toEqual('');
    });
  });

  describe('isFetchingMeReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingMeReducer(undefined, {})).toEqual(false);
    });

    it('handles SESSION:FETCH_ME__LOADING', () => {
      const action = fetchMeLoading();
      expect(isFetchingMeReducer(false, action)).toEqual(true);
    });
    it('handles SESSION:FETCH_ME__SUCCESS', () => {
      const action = fetchMeSuccess();
      expect(isFetchingMeReducer(true, action)).toEqual(false);
    });
    it('handles SESSION:FETCH_ME__ERROR', () => {
      const action = fetchMeError();
      expect(isFetchingMeReducer(true, action)).toEqual(false);
    });
  });

  describe('helpMessageStatusReducer', () => {
    it('returns the initial state', () => {
      expect(helpMessageStatusReducer(undefined, {})).toEqual(READY_STATUS);
    });

    it('handles SESSION:SEND_FOR_HELP__LOADING', () => {
      const action = sendForHelpLoading();
      expect(helpMessageStatusReducer(READY_STATUS, action)).toEqual(LOADING_STATUS);
    });
    it('handles SESSION:SEND_FOR_HELP__SUCCESS', () => {
      const action = sendForHelpSuccess();
      expect(helpMessageStatusReducer(LOADING_STATUS, action)).toEqual(SUCCESS_STATUS);
    });
    it('handles SESSION:SEND_FOR_HELP__ERROR', () => {
      const action = sendForHelpError();
      expect(helpMessageStatusReducer(LOADING_STATUS, action)).toEqual(ERROR_STATUS);
    });
    it('handles SESSION:SEND_FOR_HELP__DONE', () => {
      const action = sendForHelpDone();
      expect(helpMessageStatusReducer(SUCCESS_STATUS, action)).toEqual(READY_STATUS);
    });
  });

  describe('unconfirmedCountReducer', () => {
    it('returns the initial state', () => {
      expect(unconfirmedCountReducer(undefined, {})).toEqual(null);
    });

    it('handles SESSION:PING__SUCCESS', () => {
      const action = pingSuccess({unconfirmed_shipments: ['order1', 'order2'] });
      expect(unconfirmedCountReducer(null, action)).toEqual(2);
    });
  });

  describe('pollingIntervalLengthReducer', () => {
    it('returns the initial state', () => {
      expect(pollingIntervalLengthReducer(undefined, {})).toEqual(POLLING_INTERVALS.long);
    });

    it('handles SESSION:SET_POLLING_INTERVAL', () => {
      const action = setPollingInterval(3000);
      expect(pollingIntervalLengthReducer(1000, action)).toEqual(3000);
    });
  });
});
