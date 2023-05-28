// @flow
import buildOuath from '@minibar/store-business/src/networking/build_oauth';

import credential_storage from './credential_storage';

import env from './env';

// TODO: put this in mbrequest
export const getDefaultHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const getBaseOauthUrl = () => `${env.api_server_url}/api/v2`;
const getClientCredentials = () => ({
  client_id: env.client_id,
  client_secret: env.client_secret
});

// we create an instance of the auth module with app specific configuration
const OAuth = buildOuath(credential_storage, getClientCredentials, getBaseOauthUrl);

export default OAuth;
