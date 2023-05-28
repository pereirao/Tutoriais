// @flow
import type { CredentialStorage } from '@minibar/store-business/src/networking/build_oauth';

// based on  https://stackoverflow.com/a/16427747/3043447
// TODO: default export the function, use that instead
const TEST_KEY = 'test';
const testLS = () => {
  try {
    localStorage.setItem(TEST_KEY, TEST_KEY);
    localStorage.removeItem(TEST_KEY);
    return true;
  } catch (_e){
    return false;
  }
};

type TokenData = {token_type: string, access_token: string} & {};
export const buildCredentialStorage = (initial_token_data: TokenData = {}): CredentialStorage => { // exported for testing
  let token_data: TokenData = initial_token_data;

  // on web, we make no attempt to store or use the user's credentials
  const getUserCredentials = () => Promise.resolve(null);
  const setUserCredentials = () => Promise.resolve(null);
  const resetUserCredentials = () => Promise.resolve(null);

  const getToken = () => {
    let token_type;
    let access_token;

    if (token_data.token_type && token_data.access_token){ // if it exists in memory, we grab it
      token_type = token_data.token_type;
      access_token = token_data.access_token;
    } else if (testLS()){ // otherwise, we try to get it from local storage
      access_token = localStorage.getItem('access_token');
      token_type = localStorage.getItem('token_type');
    }

    if (token_type && access_token){ // if we now have both, return them
      return Promise.resolve({token_type, access_token});
    } else { // otherwise we return null
      return Promise.resolve(null);
    }
  };

  const setToken = ({token_type, access_token}) => {
    // we set them in memory, and back them up to local storage if available
    token_data = {token_type, access_token};
    if (testLS()){
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_type);
    }
    return Promise.resolve(true);
  };

  const resetToken = () => {
    // we remove them from both memory and local storage
    token_data = {};
    if (testLS()){
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_type');
    }
    return Promise.resolve(true);
  };

  // since we do not use user credential storage, we can simply alias resetToken
  const resetTokenAndUserCredentials = resetToken;

  return {
    getUserCredentials,
    setUserCredentials,
    resetUserCredentials,
    getToken,
    setToken,
    resetToken,
    resetTokenAndUserCredentials
  };
};

export default buildCredentialStorage();
