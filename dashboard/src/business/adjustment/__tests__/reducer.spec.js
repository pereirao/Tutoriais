
import { makeSuccessAction, makeErrorAction, makeLoadingAction } from '../../utils/create_actions_for_request';
import adjustmentReducer, { byIdReducer, isFetchingReducer } from '../reducer';
import adjustment_factory from './adjustment.factory';

const adjustmentFetchLoading = makeLoadingAction('ADJUSTMENT:FETCH');
const adjustmentFetchSuccess = makeSuccessAction('ADJUSTMENT:FETCH');
const adjustmentFetchError = makeErrorAction('ADJUSTMENT:FETCH');

describe('adjustmentReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(adjustmentReducer(undefined, {}))).toEqual([
      'by_id',
      'is_fetching'
    ]);
  });

  describe('byIdReducer', () => {
    const adjustment = adjustment_factory.build({id: 1});
    const normalized_adjustment = adjustment_factory.normalize(adjustment);
    const { entities } = normalized_adjustment;

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles ADJUSTMENT:FETCH__SUCCESS', () => {
      const action = adjustmentFetchSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: adjustment});
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles ADJUSTMENT:FETCH__LOADING', () => {
      const action = adjustmentFetchLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles ADJUSTMENT:FETCH__SUCCESS', () => {
      const action = adjustmentFetchSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles ADJUSTMENT:FETCH__ERROR', () => {
      const action = adjustmentFetchError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });
});
