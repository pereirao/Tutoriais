
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import { makeSuccessAction, makeLoadingAction, makeErrorAction } from '../../utils/create_actions_for_request';
import { order_schema } from '../../networking/schemas';
import orderReducer, {
  byIdReducer,
  makeOrderListReducers,
  isFetchingReducer,
  isUpdatingReducer
} from '../reducer';
import { markListsStale } from '../actions';
import order_factory from './order.factory';

const orderFetchAllSuccess = makeSuccessAction('ORDER:FETCH_ALL');
const orderFetchAllLoading = makeLoadingAction('ORDER:FETCH_ALL');
const orderFetchAllError = makeErrorAction('ORDER:FETCH_ALL');

const orderFetchActiveSuccess = makeSuccessAction('ORDER:FETCH_ACTIVE');
const orderFetchActiveLoading = makeLoadingAction('ORDER:FETCH_ACTIVE');
const orderFetchActiveError = makeErrorAction('ORDER:FETCH_ACTIVE');

const orderFetchCompletedSuccess = makeSuccessAction('ORDER:FETCH_COMPLETED');
const orderFetchCompletedLoading = makeLoadingAction('ORDER:FETCH_COMPLETED');
const orderFetchCompletedError = makeErrorAction('ORDER:FETCH_COMPLETED');

const orderFetchFutureSuccess = makeSuccessAction('ORDER:FETCH_FUTURE');
const orderFetchFutureLoading = makeLoadingAction('ORDER:FETCH_FUTURE');
const orderFetchFutureError = makeErrorAction('ORDER:FETCH_FUTURE');

const orderFetchOrderSuccess = makeSuccessAction('ORDER:FETCH_ORDER');
const orderUpdateSuccess = makeSuccessAction('ORDER:UPDATE_ORDER');
const orderUpdateLoading = makeLoadingAction('ORDER:UPDATE_ORDER');
const orderUpdateError = makeErrorAction('ORDER:UPDATE_ORDER');
const adjustmentFetchSuccess = makeSuccessAction('ADJUSTMENT:FETCH');
const commentFetchSuccess = makeSuccessAction('COMMENT:FETCH');
const commentAddSuccess = makeSuccessAction('COMMENT:ADD');

describe('orderReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(orderReducer(undefined, {}))).toEqual([
      'by_id',
      'all',
      'active',
      'completed',
      'future',
      'is_fetching',
      'is_updating'
    ]);
  });

  describe('byIdReducer', () => {
    const order = order_factory.build({id: 1});
    const normalized_order = order_factory.normalize(order);
    const { entities } = normalized_order;

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles ORDER:FETCH_ALL__SUCCESS', () => {
      const action = orderFetchAllSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });
    it('handles ORDER:FETCH_ACTIVE__SUCCESS', () => {
      const action = orderFetchActiveSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });
    it('handles ORDER:FETCH_COMPLETED__SUCCESS', () => {
      const action = orderFetchCompletedSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });
    it('handles ORDER:FETCH_FUTURE__SUCCESS', () => {
      const action = orderFetchFutureSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });

    it('handles ORDER:FETCH_ORDER__SUCCESS', () => {
      const action = orderFetchOrderSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });

    it('handles ORDER:UPDATE_ORDER__SUCCESS', () => {
      const action = orderUpdateSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: order});
    });

    it('handles ADJUSTMENT:FETCH__SUCCESS', () => {
      const action = adjustmentFetchSuccess({result: [2, 3]}, {order_id: 1});
      expect(byIdReducer({1: order}, action)).toEqual({ 1: {...order, order_adjustment_ids: [2, 3]} });
    });

    it('handles COMMENT:FETCH__SUCCESS', () => {
      const action = commentFetchSuccess({result: [2, 3]}, {order_id: 1});
      expect(byIdReducer({1: order}, action)).toEqual({ 1: {...order, comment_ids: [2, 3]} });
    });

    it('handles COMMENT:ADD__SUCCESS', () => {
      const action = commentAddSuccess({result: 1}, {order_id: 1});
      expect(byIdReducer({1: order}, action)).toEqual({1: {...order, comment_ids: [1]} });
    });
  });

  describe('makeOrderListReducer', () => {
    // NOTE: only testing all orders, because the other three are identical from same factory
    const list_reducers = makeOrderListReducers('ORDER:FETCH_ALL__SUCCESS');

    it('returns the initial state', () => {
      const listReducer = combineReducers(list_reducers);
      const empty_list_state = {
        filters: {
          date_range: {start: null, end: null},
          delivery_method_types: [],
          attributes: []
        },
        ids: [],
        next_page: 1,
        query: '',
        total_count: 0,
        total_pages: 1,
        is_stale: false
      };
      expect(listReducer(undefined, {})).toEqual(empty_list_state);
    });

    const order = order_factory.build({id: 1});
    const normalized_order_single = normalize({orders: [order], total_pages: 4, total_count: 1}, {orders: [order_schema]});
    const normalized_order_empty = normalize({orders: [], total_pages: 0, total_count: 0}, {orders: [order_schema]});

    it('idsReducer when page === 1, by replacing', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1});
      expect(list_reducers.ids([], action)).toEqual([1]);
    });
    it('idsReducer when page !== 1, by appending', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 3});
      expect(list_reducers.ids([2], action)).toEqual([2, 1]);
    });

    it('totalCountReducer', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1});
      expect(list_reducers.total_count(0, action)).toEqual(1);
    });

    it('totalPagesReducers', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1});
      expect(list_reducers.total_pages(0, action)).toEqual(4);
    });

    it('nextPageReducer no increment if empty', () => {
      const action = orderFetchAllSuccess(normalized_order_empty, {page: 1});
      expect(list_reducers.next_page(1, action)).toEqual(1);
    });
    it('nextPageReducer increment if not empty or last', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1});
      expect(list_reducers.next_page(1, action)).toEqual(2);
    });

    it('queryReducer handles empty query', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1, query: ''});
      expect(list_reducers.query('', action)).toEqual('');
    });
    it('queryReducer handles query', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1, query: 'beer'});
      expect(list_reducers.query('', action)).toEqual('beer');
    });

    it('filterReducer handles filters', () => {
      const filters = {
        date_range: {start: 'start_time', end: 'end_time'},
        delivery_method_types: ['shipped'],
        attributes: ['gift']
      };
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1, filters: filters});
      expect(list_reducers.filters({}, action)).toEqual(filters);
    });

    it('filterReducer handles empty filters', () => {
      const empty_filters = {
        date_range: {start: null, end: null},
        delivery_method_types: [],
        attributes: []
      };
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1, filters: empty_filters});
      expect(list_reducers.filters({}, action)).toEqual(empty_filters);
    });

    it('isStaleReducer handles mark as stale', () => {
      const action = markListsStale();
      expect(list_reducers.is_stale(false, action)).toEqual(true);
    });
    it('isStaleReducer handles fetch success', () => {
      const action = orderFetchAllSuccess(normalized_order_single, {page: 1, query: 'beer'});
      expect(list_reducers.is_stale(true, action)).toEqual(false);
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles ORDER:FETCH_ACTIVE__LOADING', () => {
      const action = orderFetchActiveLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles ORDER:FETCH_ACTIVE__SUCCESS', () => {
      const action = orderFetchActiveSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles ORDER:FETCH_ACTIVE__ERROR', () => {
      const action = orderFetchActiveError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });

    it('handles ORDER:FETCH_ALL__LOADING', () => {
      const action = orderFetchAllLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles ORDER:FETCH_ALL__SUCCESS', () => {
      const action = orderFetchAllSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles ORDER:FETCH_ALL__ERROR', () => {
      const action = orderFetchAllError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });

    it('handles ORDER:FETCH_COMPLETED__LOADING', () => {
      const action = orderFetchCompletedLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles ORDER:FETCH_COMPLETED__SUCCESS', () => {
      const action = orderFetchCompletedSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles ORDER:FETCH_COMPLETED__ERROR', () => {
      const action = orderFetchCompletedError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });

    it('handles ORDER:FETCH_FUTURE__LOADING', () => {
      const action = orderFetchFutureLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles ORDER:FETCH_FUTURE__SUCCESS', () => {
      const action = orderFetchFutureSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles ORDER:FETCH_FUTURE__ERROR', () => {
      const action = orderFetchFutureError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });

  describe('isUpdatingReducer', () => {
    it('returns the initial state', () => {
      expect(isUpdatingReducer(undefined, {})).toEqual(false);
    });

    it('handles ORDER:UPDATE_ORDER__LOADING', () => {
      const action = orderUpdateLoading();
      expect(isUpdatingReducer(false, action)).toEqual(true);
    });
    it('handles ORDER:UPDATE_ORDER__SUCCESS', () => {
      const action = orderUpdateSuccess();
      expect(isUpdatingReducer(true, action)).toEqual(false);
    });
    it('handles ORDER:UPDATE_ORDER__ERROR', () => {
      const action = orderUpdateError();
      expect(isUpdatingReducer(true, action)).toEqual(false);
    });
  });
});
