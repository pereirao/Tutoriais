//@flow

import _ from 'lodash';
import qs from 'qs';
import I18n from '../../localization';
import type { Action } from '../store';
import type { NetworkError } from './index';

export const checkStatus = (response: Object) => {
  if (response.ok) return Promise.resolve(response);

  const error_prom = response.json()
    .then(
      (json) => (json.error || {message: I18n.t('system.network_error.generic_networking')}), // json response
      () => ({message: I18n.t('system.network_error.json_parse')}) // non-json response
    )
    .then(error => Promise.reject({error, response}));

  return error_prom;
};


export const formatRuntimeErrors = (error: any): Promise<NetworkError> => {
  console.info('error attempting network request', error);

  // if it's not an Error object, pass it through
  if (!_.isError(error)) return Promise.reject(error);

  // otherwise, format it
  let error_message = error.message;
  if (!error_message){
    error_message = I18n.t('system.network_error.generic_runtime');
  } else if (error_message && error_message.includes('Unexpected token < in JSON')){
    error_message = I18n.t('system.network_error.json_parse');
  }
  return Promise.reject({error: {message: error_message}});
};

export const buildExternalUrl = (url_base: string) => (url_path_template: string, params: Object = {}) => {
  let querystring_params = params;
  const url_path_segments = url_path_template.split('/').map(path_segment => {
    if (!path_segment.startsWith(':')) return path_segment; // it's a raw path_segment, just pass it through

    const param_key = path_segment.slice(1); // pull the : off the front
    querystring_params = _.omit(querystring_params, param_key);

    return params[param_key] || '';
  });

  const url = joinQSParams(url_base, url_path_segments.join('/'), querystring_params);
  return url;
};
const encodeParams = (params) => qs.stringify(params, {arrayFormat: 'brackets'});
const joinQSParams = (url_base, url_path, querystring_params) => {
  if (!_.isEmpty(querystring_params)){
    return `${url_base}/${url_path}?${encodeParams(querystring_params)}`;
  } else {
    return `${url_base}/${url_path}`;
  }
};

export const isFailedNetworkErrorAction = (action: Action) => (
  action.type.endsWith('__ERROR') && (_.get(action, 'payload.error.message') === 'Network request failed')
);
