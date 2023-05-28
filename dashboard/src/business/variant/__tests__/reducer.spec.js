
import { normalize } from 'normalizr';
import { makeSuccessAction, makeErrorAction, makeLoadingAction } from '../../utils/create_actions_for_request';
import { variant_schema } from '../../networking/schemas';
import variantReducer, {
  byIdReducer,
  listIdsReducer,
  totalCountReducer,
  totalPagesReducer,
  nextPageReducer,
  queryReducer,
  filtersReducer,
  isFetchingReducer,
  isUpdatingReducer
} from '../reducer';
import variant_factory from './variant.factory';

const variantFetchLoading = makeLoadingAction('VARIANT:FETCH');
const variantFetchSuccess = makeSuccessAction('VARIANT:FETCH');
const variantFetchError = makeErrorAction('VARIANT:FETCH');
// const variantCreateSuccess = makeSuccessAction('VARIANT:CREATE');
const variantUpdateLoading = makeLoadingAction('VARIANT:UPDATE');
const variantUpdateSuccess = makeSuccessAction('VARIANT:UPDATE');
const variantUpdateError = makeErrorAction('VARIANT:UPDATE');
// const variantDestroySuccess = makeSuccessAction('VARIANT:DESTROY');

describe('variantReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(variantReducer(undefined, {}))).toEqual([
      'by_id',
      'list_ids',
      'total_pages',
      'total_count',
      'next_page',
      'query',
      'filters',
      'is_fetching',
      'is_updating'
    ]);
  });

  describe('byIdReducer', () => {
    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    const variant = variant_factory.build({id: 1});
    const normalized_variant = variant_factory.normalize(variant);

    it('handles VARIANT:FETCH__SUCCESS', () => {
      const { entities } = normalized_variant;
      const action = variantFetchSuccess({entities}, {page: 1});
      expect(byIdReducer({}, action)).toEqual({1: variant});
    });

    it('handles VARIANT:UPDATE__SUCCESS', () => {
      const edited_variant = variant_factory.build({id: 1});
      const normalized_edited_variant = variant_factory.normalize(edited_variant);
      const { entities } = normalized_edited_variant;
      const action = variantUpdateSuccess({entities});
      expect(byIdReducer({1: variant}, action)).toEqual({1: edited_variant});
    });
  });

  describe('listIdsReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    it('returns the initial state', () => {
      expect(listIdsReducer(undefined, {})).toEqual([]);
    });

    it('handles VARIANT:FETCH__SUCCESS', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1});
      expect(listIdsReducer([], action)).toEqual([1]);
    });
  });


  describe('totalCountReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    it('totalCountReducer', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1});
      expect(totalCountReducer(0, action)).toEqual(1);
    });
  });
  describe('totalPagesReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    it('totalPagesReducer', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1});
      expect(totalPagesReducer(0, action)).toEqual(4);
    });
  });
  describe('nextPageReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    const normalized_variant_empty = normalize({variants: [], total_pages: 0, total_count: 0}, {variants: [variant_schema]});
    it('nextPageReducer no increment if empty', () => {
      const action = variantFetchSuccess(normalized_variant_empty, {page: 1});
      expect(nextPageReducer(1, action)).toEqual(1);
    });
    it('nextPageReducer increment if not empty or last', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1});
      expect(nextPageReducer(1, action)).toEqual(2);
    });
  });
  describe('queryReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    it('queryReducer handles empty query', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1, query: ''});
      expect(queryReducer('', action)).toEqual('');
    });
    it('queryReducer handles query', () => {
      const action = variantFetchSuccess(normalized_variant_single, {page: 1, query: 'beer'});
      expect(queryReducer('', action)).toEqual('beer');
    });
  });
  describe('filtersReducer', () => {
    const variant = variant_factory.build({id: 1});
    const normalized_variant_single = normalize({
      variants: [variant],
      total_pages: 4,
      total_count: 1
    }, {variants: [variant_schema]});
    it('filtersReducer handles filters', () => {
      const filters = { in_stock: true };
      const action = variantFetchSuccess(normalized_variant_single, {page: 1, ...filters});
      expect(filtersReducer({}, action)).toEqual(filters);
    });

    it('filtersReducer handles empty filters', () => {
      const empty_filters = { in_stock: null };
      const action = variantFetchSuccess(normalized_variant_single, {page: 1, ...empty_filters});
      expect(filtersReducer({}, action)).toEqual({});
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles VARIANT:FETCH__LOADING', () => {
      const action = variantFetchLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles VARIANT:FETCH__SUCCESS', () => {
      const action = variantFetchSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles VARIANT:FETCH__ERROR', () => {
      const action = variantFetchError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });

  describe('isUpdatingReducer', () => {
    it('returns the initial state', () => {
      expect(isUpdatingReducer(null, {})).toEqual(null);
    });

    it('handles VARIANT:UPDATE__LOADING', () => {
      const action = variantUpdateLoading({id: 1}, {result: null});
      expect(isUpdatingReducer(null, action)).toEqual(1);
    });
    it('handles VARIANT:UPDATE__SUCCESS', () => {
      const action = variantUpdateSuccess();
      expect(isUpdatingReducer(null, action)).toEqual(null);
    });
    it('handles VARIANT:UPDATE__ERROR', () => {
      const action = variantUpdateError();
      expect(isUpdatingReducer(null, action)).toEqual(null);
    });
  });
});
