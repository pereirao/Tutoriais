// @flow

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import baseReducer from '../../../business/base_reducer';

/*
  This testing utility is intended to be used whereever we need to test a connected component, or a component with a connected child. However, wherever possible, try to test the underlying component without the store.
*/

type TestProviderProps = {initial_state?: Object, children?: React$Element<*>};
const TestProvider = ({initial_state = {}, children, ...rest_props}: TestProviderProps) => {
  const store = createStore(baseReducer, initial_state);
  return <Provider store={store} {...rest_props}>{children}</Provider>;
};

export default TestProvider;
