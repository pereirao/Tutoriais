import { combineReducers } from 'redux';
import { createAction } from 'redux-actions';
import { createRoutine } from 'redux-saga-routines';
import { LOADING_STATUS, READY_STATUS, ERROR_STATUS } from '../utils/fetch_status';
import { mapToArray } from '../utils';

export const SearchSubstituteRoutine = createRoutine('SEARCH_SUBSTITUTE_ROUTINE');
export const SetSubstituteRoutine = createRoutine('SET_SUBSTITUTE_ROUTINE', payload => payload, (payload, meta) => meta);
export const OpenSubstituteModal = createAction('OPEN_SUBSTITUTE_MODEL');
export const CloseSubstituteModal = createAction('CLOSE_SUBSTITUTE_MODEL');

const localState = ({ substitute }) => substitute;
export const selectSubstitutes = state => mapToArray(localState(state).by_id);
export const selectSubstitutesLoading = state => localState(state).status === LOADING_STATUS;
export const selectSubstitutesReady = state => localState(state).status === READY_STATUS;
export const selectSubstitutesIdle = state => localState(state).status === null;
export const selectSubstitutePreviewBySku = state => sku => (localState(state).previews || {})[sku];
export const selectSubstituteModalIsOpen = state => id => localState(state).modals[id];
export const selectSubstitutingBySku = state => sku => {
  const preview = selectSubstitutePreviewBySku(state)(sku);
  return preview && (preview.status === LOADING_STATUS);
};

export default combineReducers({
  by_id: byIdReducer,
  modals: modalReducer,
  status: statusReducer,
  previews: previewsReducer
});

function statusReducer(state = null, action){
  switch (action.type){
    case SearchSubstituteRoutine.TRIGGER:
      return LOADING_STATUS;
    case SearchSubstituteRoutine.FULFILL:
      return READY_STATUS;
    default:
      return state;
  }
}

function byIdReducer(state = {}, action){
  switch (action.type){
    case SearchSubstituteRoutine.TRIGGER:
      return [];
    case SearchSubstituteRoutine.SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
}

function previewsReducer(state = {}, action){
  const { payload, meta } = action;
  switch (action.type){
    case SetSubstituteRoutine.TRIGGER:
      return ({
        ...state,
        [payload.original]: {
          ...state[payload.original],
          status: LOADING_STATUS
        }
      });
    case SetSubstituteRoutine.FAILURE:
      return ({
        ...state,
        [meta.original]: {
          ...state[meta.original],
          status: ERROR_STATUS,
          error: payload
        }
      });
    case SetSubstituteRoutine.SUCCESS:
      return ({
        ...state,
        [meta.original]: {
          ...state[meta.original],
          status: READY_STATUS
        }
      });
    case SetSubstituteRoutine.FULFILL:
      return state;
    default:
      return state;
  }
}

function modalReducer(state = {}, action){
  const { type, payload } = action;
  switch (type){
    case OpenSubstituteModal.toString():
      return {
        ...state,
        [payload]: true
      };
    case CloseSubstituteModal.toString():
      return {
        ...state,
        [payload]: false
      };
    default:
      return state;
  }
}
