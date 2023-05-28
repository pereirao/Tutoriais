//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'employee';

// local selectors
export const allIds = (state: LocalState) => state.all_ids;
export const createEmployeeErrors = (state: LocalState) => state.create_employee_errors;
export const isFetching = (state: LocalState) => state.is_fetching;
export const updatingId = (state: LocalState) => state.updating_id;
export const isCreating = (state: LocalState) => state.is_creating;
export const successfullyCreated = (state: LocalState) => state.successfully_created;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    allIds,
    createEmployeeErrors,
    isFetching,
    updatingId,
    isCreating,
    successfullyCreated
  })
};
