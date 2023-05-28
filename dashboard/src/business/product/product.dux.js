import { combineReducers } from 'redux';
import { createAction } from 'redux-actions';
import { createRoutine } from 'redux-saga-routines';
import { LOADING_STATUS, READY_STATUS, ERROR_STATUS } from '../utils/fetch_status';
import { mapToArray } from '../utils';

export const SearchProductRoutine = createRoutine('SEARCH_PRODUCT_ROUTINE');
export const MergeProductRoutine = createRoutine('MERGE_PRODUCT_ROUTINE', payload => payload, (payload, meta) => meta);
export const OpenProductMergeModal = createAction('OPEN_PRODUCT_MERGE_MODEL');
export const CloseProductMergeModal = createAction('CLOSE_PRODUCT_MERGE_MODEL');

const localState = ({ product }) => product;
export const selectProducts = state => mapToArray(localState(state).by_id);
export const selectProductsLoading = state => localState(state).status === LOADING_STATUS;
export const selectProductsReady = state => localState(state).status === READY_STATUS;
export const selectProductsIdle = state => localState(state).status === null;
export const selectProductPreviewById = state => id => (localState(state).previews || {})[id];
export const selectProductMergeModalIsOpen = state => id => localState(state).modals[id];
export const selectProductMergingById = state => id => {
  const preview = selectProductPreviewById(state)(id);
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
    case SearchProductRoutine.TRIGGER:
      return LOADING_STATUS;
    case SearchProductRoutine.FULFILL:
      return READY_STATUS;
    default:
      return state;
  }
}

function byIdReducer(state = {}, action){
  switch (action.type){
    case SearchProductRoutine.TRIGGER:
      return [];
    case SearchProductRoutine.SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
}

function previewsReducer(state = {}, action){
  const { payload, meta } = action;
  switch (action.type){
    case MergeProductRoutine.TRIGGER:
      return ({
        ...state,
        [payload.original]: {
          ...state[payload.original],
          status: LOADING_STATUS
        }
      });
    case MergeProductRoutine.FAILURE:
      return ({
        ...state,
        [meta.original]: {
          ...state[meta.original],
          status: ERROR_STATUS,
          error: payload
        }
      });
    case MergeProductRoutine.SUCCESS:
      return ({
        ...state,
        [meta.original]: {
          ...state[meta.original],
          status: READY_STATUS
        }
      });
    case MergeProductRoutine.FULFILL:
      return state;
    default:
      return state;
  }
}

function modalReducer(state = {}, action){
  const { type, payload } = action;
  switch (type){
    case OpenProductMergeModal.toString():
      return {
        ...state,
        [payload]: true
      };
    case CloseProductMergeModal.toString():
      return {
        ...state,
        [payload]: false
      };
    default:
      return state;
  }
}
