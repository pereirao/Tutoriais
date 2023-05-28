//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'settings';

// local selectors
export const workingHours = (state: LocalState) => state.working_hours;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    workingHours
  })
};
