// @flow
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';
import thunk from 'redux-thunk';
import {createEpicMiddleware} from 'redux-observable';
import {createBrowserHistory} from 'history';
import TEMP_INITIAL_STATE from './temp_init_state';

import baseReducer from './base_reducer';
import rootEpic from './epics';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export type Action = {|
  type: string,
  payload?: any,
  meta?: Object,
  error?: boolean
|};

const initial_state = process.env.NODE_ENV === 'development' ? TEMP_INITIAL_STATE : {};
const enhancers = [];
const epicMiddleware = createEpicMiddleware()

const middleware = [
  epicMiddleware,
  thunk,
  routerMiddleware(history),
  sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (_.isFunction(devToolsExtension)) {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  baseReducer(history),
  initial_state,
  composedEnhancers
);

export default store;
sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic)

