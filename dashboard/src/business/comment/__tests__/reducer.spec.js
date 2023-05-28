
import { makeSuccessAction, makeErrorAction, makeLoadingAction } from '../../utils/create_actions_for_request';
import commentReducer, { byIdReducer, isFetchingReducer } from '../reducer';
import comment_factory from './comment.factory';

const commentFetchLoading = makeLoadingAction('COMMENT:FETCH');
const commentFetchSuccess = makeSuccessAction('COMMENT:FETCH');
const commentFetchError = makeErrorAction('COMMENT:FETCH');

const commentAddLoading = makeLoadingAction('COMMENT:ADD');
const commentAddSuccess = makeSuccessAction('COMMENT:ADD');
const commentAddError = makeErrorAction('COMMENT:ADD');


describe('commentReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(commentReducer(undefined, {}))).toEqual([
      'by_id',
      'is_fetching'
    ]);
  });

  describe('byIdReducer', () => {
    const comment = comment_factory.build({id: 1});
    const normalized_comment = comment_factory.normalize(comment);
    const { entities } = normalized_comment;

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles COMMENT:FETCH__SUCCESS', () => {
      const action = commentFetchSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: comment});
    });

    it('handles COMMENT:ADD__SUCCESS', () => {
      const action = commentAddSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: comment});
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles COMMENT:FETCH__LOADING', () => {
      const action = commentFetchLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles COMMENT:FETCH__SUCCESS', () => {
      const action = commentFetchSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles COMMENT:FETCH__ERROR', () => {
      const action = commentFetchError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });


    it('handles COMMENT:ADD__LOADING', () => {
      const action = commentAddLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles COMMENT:ADD__SUCCESS', () => {
      const action = commentAddSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles COMMENT:ADD__ERROR', () => {
      const action = commentAddError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });
});
