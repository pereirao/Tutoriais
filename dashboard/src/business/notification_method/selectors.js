//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'notification_method';

// local selectors
export const allIds = (state: LocalState) => state.all_ids;
export const createNotificationMethodErrors = (state: LocalState) => state.create_notification_method_errors;
export const isFetching = (state: LocalState) => state.is_fetching;
export const updatingId = (state: LocalState) => state.updating_id;
export const isCreating = (state: LocalState) => state.is_creating;
export const successfullyCreated = (state: LocalState) => state.successfully_created;


// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    allIds,
    createNotificationMethodErrors,
    isFetching,
    updatingId,
    isCreating,
    successfullyCreated
  })
};
