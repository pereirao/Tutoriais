// @flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'ui';

// local selectors
export const orderStateModalId = (state: LocalState) => state.order_state_modal_id;
export const isForceRefreshModalOpen = (state: LocalState) => state.force_refresh_modal_open;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    orderStateModalId,
    isForceRefreshModalOpen
  })
};
