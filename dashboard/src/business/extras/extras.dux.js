import { combineReducers } from 'redux';
import { createRoutine } from 'redux-saga-routines';
import { LOADING_STATUS, READY_STATUS, ERROR_STATUS } from '../utils/fetch_status';
import { mapToArray } from '../utils';

export const SetExtrasRoutine = createRoutine('SET_EXTRAS_ROUTINE', payload => payload, (payload, meta) => meta);

const localState = ({ substitute }) => substitute;
export const saveSubstitute = state => mapToArray(localState(state).by_id);
export const saveSubstituteLoading = state => localState(state).status === LOADING_STATUS;
export const saveSubstituteReady = state => localState(state).status === READY_STATUS;
export const saveSubstituteIdle = state => localState(state).status === undefined;

export default combineReducers({
  setup: setupReducers
});

function setupReducers(state = {}, action){
  const { payload, meta } = action;
  switch (action.type){
    case SetExtrasRoutine.TRIGGER:
      return ({
        ...state,
        [payload.original]: {
          ...state[payload.original],
          status: LOADING_STATUS
        }
      });
    case SetExtrasRoutine.FAILURE:
      return ({
        ...state,
        [meta.original]: {
          ...state[meta.original],
          status: ERROR_STATUS,
          error: payload
        }
      });
    case SetExtrasRoutine.SUCCESS:
      return state;
    case SetExtrasRoutine.FULFILL:
      return state;
    default:
      return state;
  }
}
