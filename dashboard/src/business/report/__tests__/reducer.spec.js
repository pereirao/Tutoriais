
import { makeSuccessAction } from '../../utils/create_actions_for_request';
import reportReducer, { byIdReducer, allIdsReducer } from '../reducer';
import report_factory from './report.factory';

const reportFetchSuccess = makeSuccessAction('REPORT:FETCH');
const reportCreateSuccess = makeSuccessAction('REPORT:CREATE');
const reportPollSuccess = makeSuccessAction('REPORT:POLL');


describe('reportReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(reportReducer(undefined, {}))).toEqual([
      'by_id',
      'all_ids'
    ]);
  });

  describe('byIdReducer', () => {
    const report = report_factory.build({id: 1});
    const normalized_report = report_factory.normalize(report);

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles REPORT:FETCH__SUCCESS', () => {
      const { entities } = normalized_report;
      const action = reportFetchSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: report});
    });

    it('handles REPORT:POLL__SUCCESS', () => {
      const { entities } = normalized_report;
      const action = reportPollSuccess({entities});
      expect(byIdReducer({2: report}, action)).toEqual({1: report, 2: report});
    });

    it('handles REPORT:CREATE__SUCCESS', () => {
      const new_report = report_factory.build({id: 2});
      const normalized_new_report = report_factory.normalize(new_report);
      const { entities } = normalized_new_report;
      const action = reportCreateSuccess({entities});
      expect(byIdReducer({1: report}, action)).toEqual({1: report, 2: new_report});
    });
  });

  describe('allIdsReducer', () => {
    it('returns the initial state', () => {
      expect(allIdsReducer(undefined, {})).toEqual([]);
    });

    it('handles REPORT:FETCH__SUCCESS', () => {
      const action = reportFetchSuccess({result: [1, 2, 3]});
      expect(allIdsReducer([], action)).toEqual([1, 2, 3]);
    });

    it('handles REPORT:POLL__SUCCESS', () => {
      const action = reportPollSuccess({result: 1});
      expect(allIdsReducer([1, 2, 3], action)).toEqual(1);
    });

    it('handles REPORT:CREATE__SUCCESS', () => {
      const action = reportCreateSuccess({result: 1});
      expect(allIdsReducer([2, 3], action)).toEqual([1, 2, 3]);
    });
  });
});
