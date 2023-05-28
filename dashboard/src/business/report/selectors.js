//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'report';

// local selectors
export const allIds = (state: LocalState) => state.all_ids; // STUBBED
export const isFetching = (state: LocalState) => state.is_fetching;
export const isUpdating = (state: LocalState) => state.is_updating;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    allIds,
    isFetching,
    isUpdating
  })
};
