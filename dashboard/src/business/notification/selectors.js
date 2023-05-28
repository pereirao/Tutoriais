//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'notification';

// local selectors
export const displayOrder = (state: LocalState) => state.display_order;
export const totalCount = (state: LocalState) => state.display_order.length;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    displayOrder,
    totalCount
  })
};
