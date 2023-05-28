// @flow

import _ from 'lodash';
import OAuth from './oauth';
import env from './env';
import { version } from '../../../package.json';
import { checkStatus, formatRuntimeErrors, buildExternalUrl } from './helpers';

const getDefaultHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const getBaseUrl = () => `${env.api_server_url}/api/partners/v2`;

export const makeMBRequest = (url: string, fetch_args: ?Object, handleHTTPResponse = (r => r.json())) => {
  const sendRequest = () => {
    return getMBHeaders()
      .then(headers => fetch(url, {...fetch_args, headers}))
      .then(response => checkStatus(response));
  };

  const authRetry = (error) => {
    // if it's not an authentication error, let it continue on the error path
    if (_.get(error, 'response.status') !== 401) return Promise.reject(error);

    // otherwise, reauthenticate and retry the request
    const retry_prom = OAuth.fetchTokenWithStoredCredentials().then(sendRequest);
    return retry_prom;
  };

  const request_prom = sendRequest()
    .catch(authRetry)
    .then(handleHTTPResponse)
    .catch(formatRuntimeErrors);

  return request_prom;
};

// exporting for testing
export const getMBHeaders = () => {
  const header_prom = OAuth.getToken().then(({token_type, access_token}) => ({
    'authorization': `${token_type} ${access_token}`,
    'app-version': version,
    ...getDefaultHeaders()
  }));

  return header_prom;
};

export const buildMBApiUrl = buildExternalUrl(getBaseUrl());
