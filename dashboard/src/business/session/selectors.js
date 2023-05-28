//@flow

import _ from 'lodash';
import { createSelector } from 'reselect';
import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { GlobalState } from '../global_state_type';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'session';

const localState = (state: GlobalState) => state[LOCAL_PATH];
// local selectors
export const currentSupplier = (state: LocalState) => state.me.supplier;
export const isLoggingIn = (state: LocalState) => state.is_logging_in;
export const loginError = (state: LocalState) => state.login_error;
export const isFetchingMe = (state: LocalState) => state.is_fetching_me;
export const myName = (state: LocalState) => state.me.name;
export const myEmail = (state: LocalState) => state.me && state.me.email;
export const shippingMethods = (state: LocalState) => state.me.supplier.shipping_methods;
export const supplierBreak = (state: LocalState) => state.me.supplier.current_break;
export const supplierName = (state: LocalState) => state.me.supplier.name;
export const storeRating = (state: LocalState) => state.me.supplier.metrics.score;
export const userIsLoggedIn = (state: LocalState) => !!state.me;
export const helpMessageStatus = (state: LocalState) => state.help_message_status;
export const pollingIntervalLength = (state: LocalState) => state.polling_interval_length;
export const unconfirmedCount = (state: LocalState) => state.unconfirmed_count;
export const supplierFeatures = (state: GlobalState) =>
  localState(state).me.supplier && localState(state).me.supplier.feature_items;
export const supplierHasFeature = (feature: string) =>
  createSelector(supplierFeatures, features => _.some(features, { feature }));

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    currentSupplier,
    isLoggingIn,
    loginError,
    isFetchingMe,
    myName,
    myEmail,
    shippingMethods,
    supplierBreak,
    storeRating,
    supplierName,
    userIsLoggedIn,
    helpMessageStatus,
    pollingIntervalLength,
    unconfirmedCount
  })
};
