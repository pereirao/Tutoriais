// @flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'adjustment';

// local selectors
export const isFetching = (state: LocalState) => state.is_fetching;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    isFetching
  })
};
