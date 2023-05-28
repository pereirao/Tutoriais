// @flow

export type FetchStatus = 'READY' | 'LOADING' | 'SUCCESS' | 'ERROR';

// no request has been made - default
export const READY_STATUS: FetchStatus = 'READY';

// at least one request is pending
export const LOADING_STATUS: FetchStatus = 'LOADING';

// a request has responded successfully
export const SUCCESS_STATUS: FetchStatus = 'SUCCESS';

// a request has failed
export const ERROR_STATUS: FetchStatus = 'ERROR';
