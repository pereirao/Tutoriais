//@flow

import {combineReducers} from 'redux';
import {adjustmentReducer} from './adjustment';
import {commentReducer} from './comment';
import {employeeReducer} from './employee';
import {notificationReducer} from './notification';
import {notificationMethodReducer} from './notification_method';
import {orderReducer} from './order';
import {reportReducer} from './report';
import {uiReducer} from './ui';
import {sessionReducer} from './session';
import {variantReducer} from './variant';
import {settingsReducer} from './settings';
import substituteReducer from './substitute/substitute.dux';
import productReducer from './product/product.dux';
import {connectRouter} from "connected-react-router";

const appReducer = (history) => combineReducers({
  adjustment: adjustmentReducer,
  comment: commentReducer,
  employee: employeeReducer,
  notification: notificationReducer,
  notification_method: notificationMethodReducer,
  order: orderReducer,
  report: reportReducer,
  ui: uiReducer,
  router: connectRouter(history),
  session: sessionReducer,
  variant: variantReducer,
  settings: settingsReducer,
  substitute: substituteReducer,
  product: productReducer
});

const rootReducer = (history) => (state, action) => {
  let app_state = state;
  if (action.type === 'SESSION:RESET_STATE') {
    app_state = undefined;
  }
  return appReducer(history)(app_state, action);
};

export default rootReducer;
