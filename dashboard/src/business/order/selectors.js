//@flow
import _ from 'lodash';
import { createSelector } from 'reselect';
import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';
import type { OrderListName } from './index';

const LOCAL_PATH = 'order';

// local selectors
export const orderList = (state: LocalState, list_name: OrderListName) => state[list_name];

export const orderById = (state: LocalState) => (id: string) => {
  return state[LOCAL_PATH].by_id[id];
};

export const isFetching = (state: LocalState) => state.is_fetching;
export const isUpdating = (state: LocalState) => state.is_updating;

export const substitutionsByOrderId = (id: string) => createSelector(
  (state) => orderById(state)(id),
  (order) => {
    return (order || {}).substitutions || [];
  }
);

export const substitutionsByOrderItemId = (orderId: string, orderItemId: number) =>
  createSelector(
    substitutionsByOrderId(orderId),
    (substitutions) => _.filter(substitutions, ({original_id}) => original_id === orderItemId)
  );

export const pendingSubstitutionsByOrderItemId = (orderId: integer, orderItemId: integer) =>
  createSelector(
    substitutionsByOrderItemId(orderId, orderItemId),
    (substitutions) => _.filter(substitutions, ({ status }) => _.includes(['pending'], status))
  );

export const pendingSubstitutionsByOrderId = (orderId: string) => (state: LocalState) => {
  const substitutions = substitutionsByOrderId(orderId)(state);
  return _.filter(substitutions, ({ status }) => _.includes(['pending'], status));
};


// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    orderList,
    orderById,
    isFetching,
    isUpdating,
    substitutionsByOrderId
  }),
  pendingSubstitutionsByOrderId
};
