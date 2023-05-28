import _ from 'lodash';

import { combineEpics } from 'redux-observable';

import { adjustment_epics } from './adjustment';
import { comment_epics } from './comment';
import { order_epics } from './order';
import { session_epics } from './session';
import { employee_epics } from './employee';
import { notification_method_epics } from './notification_method';
import { report_epics } from './report';
import { variant_epics } from './variant';
import { settings_epics } from './settings';

// convert the imported epic objects into an array
const epics_by_module = [
  adjustment_epics,
  comment_epics,
  order_epics,
  session_epics,
  employee_epics,
  notification_method_epics,
  report_epics,
  variant_epics,
  settings_epics
];

const epics = _.flatMap(epics_by_module, (module_epic_exports) => {
  // we pull the actual epic functions out of the exports we recieved from the each file
  const module_epics = _.values(module_epic_exports);
  return module_epics;
});

const rootEpic = combineEpics(...epics);
export default rootEpic;
