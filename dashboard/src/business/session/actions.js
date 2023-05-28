// @flow

type Credentials = {[email]: string, [password]: string};
export const authenticate = (credentials: Credentials, options?: {notify: boolean} = {notify: true}) => ({
  type: 'SESSION:AUTHENTICATE',
  payload: credentials,
  meta: options
});

export const signOut = () => ({type: 'SESSION:SIGN_OUT'});

export const fetchMe = () => ({type: 'SESSION:FETCH_ME'});

export const sendForHelp = (type: string, body: string) => ({
  type: 'SESSION:SEND_FOR_HELP',
  payload: { type, body }
});

export const ping = () => ({type: 'SESSION:PING'});

export const takeBreak = (period) => ({
  type: 'SESSION:TAKE_BREAK',
  payload: {period}
});

export const changeDeliveryExpectation = (period, delivery_expectation) => ({
  type: 'SESSION:CHANGE_DELIVERY_EXPECTATION',
  payload: {period, delivery_expectation}
});

export const resumeWork = () => ({type: 'SESSION:RESUME_WORK'});

export const resetState = () => ({type: 'SESSION:RESET_STATE'});

export const setPollingInterval = (interval_length) => ({
  type: 'SESSION:SET_POLLING_INTERVAL',
  payload: {interval_length}
});

export const clearLoginError = () => ({type: 'SESSION:CLEAR_LOGIN_ERROR'});
