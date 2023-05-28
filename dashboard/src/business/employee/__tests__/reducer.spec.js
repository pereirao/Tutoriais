
import { makeSuccessAction, makeErrorAction, makeLoadingAction } from '../../utils/create_actions_for_request';
import employeeReducer, {
  byIdReducer,
  allIdsReducer,
  isFetchingReducer,
  updatingIdReducer,
  isCreatingReducer,
  createEmployeeErrorsReducer,
  successfullyCreatedReducer
} from '../reducer';
import { resetNewEmployeeForm } from '../actions';
import employee_factory from './employee.factory';

const employeeFetchLoading = makeLoadingAction('EMPLOYEE:FETCH');
const employeeFetchSuccess = makeSuccessAction('EMPLOYEE:FETCH');
const employeeFetchError = makeErrorAction('EMPLOYEE:FETCH');
const employeeCreateLoading = makeLoadingAction('EMPLOYEE:CREATE');
const employeeCreateSuccess = makeSuccessAction('EMPLOYEE:CREATE');
const employeeCreateError = makeErrorAction('EMPLOYEE:CREATE');
const employeeUpdateLoading = makeLoadingAction('EMPLOYEE:UPDATE');
const employeeUpdateSuccess = makeSuccessAction('EMPLOYEE:UPDATE');
const employeeUpdateError = makeErrorAction('EMPLOYEE:UPDATE');
const employeeDestroySuccess = makeSuccessAction('EMPLOYEE:DESTROY');

describe('employeeReducer', () => {
  it('structures the state slice', () => {
    expect(Object.keys(employeeReducer(undefined, {}))).toEqual([
      'by_id',
      'all_ids',
      'is_fetching',
      'updating_id',
      'is_creating',
      'create_employee_errors',
      'successfully_created'
    ]);
  });

  describe('byIdReducer', () => {
    const employee = employee_factory.build({id: 1});
    const normalized_employee = employee_factory.normalize(employee);

    it('returns the initial state', () => {
      expect(byIdReducer(undefined, {})).toEqual({});
    });

    it('handles EMPLOYEE:FETCH__SUCCESS', () => {
      const { entities } = normalized_employee;
      const action = employeeFetchSuccess({entities});
      expect(byIdReducer({}, action)).toEqual({1: employee});
    });

    it('handles EMPLOYEE:CREATE__SUCCESS', () => {
      const new_employee = employee_factory.build({id: 2});
      const normalized_new_employee = employee_factory.normalize(new_employee);
      const { entities } = normalized_new_employee;
      const action = employeeCreateSuccess({entities});
      expect(byIdReducer({1: employee}, action)).toEqual({1: employee, 2: new_employee});
    });

    it('handles EMPLOYEE:UPDATE__SUCCESS', () => {
      const edited_employee = employee_factory.build('is_driver', {id: 1});
      const normalized_edited_employee = employee_factory.normalize(edited_employee);
      const { entities } = normalized_edited_employee;
      const action = employeeUpdateSuccess({entities});
      expect(byIdReducer({1: employee}, action)).toEqual({1: edited_employee});
    });

    it('handles EMPLOYEE:DESTROY__SUCCESS', () => {
      const { result, entities} = normalized_employee;
      const action = employeeDestroySuccess({entities, result});
      const other_employee = employee_factory.normalize(employee_factory.build({id: 2}));
      expect(byIdReducer({1: employee, 2: other_employee}, action)).toEqual({2: other_employee});
    });
  });

  describe('allIdsReducer', () => {
    it('returns the initial state', () => {
      expect(allIdsReducer(undefined, {})).toEqual([]);
    });

    it('handles EMPLOYEE:FETCH__SUCCESS', () => {
      const action = employeeFetchSuccess({result: [1, 2, 3]});
      expect(allIdsReducer([], action)).toEqual([1, 2, 3]);
    });

    it('handles EMPLOYEE:CREATE__SUCCESS', () => {
      const action = employeeCreateSuccess({result: 1});
      expect(allIdsReducer([2, 3], action)).toEqual([2, 3, 1]);
    });

    it('handles EMPLOYEE:DESTROY__SUCCESS', () => {
      const action = employeeDestroySuccess({result: [1, 2]});
      expect(allIdsReducer([1, 2, 3], action)).toEqual([1, 2]);
    });
  });

  describe('isFetchingReducer', () => {
    it('returns the initial state', () => {
      expect(isFetchingReducer(undefined, {})).toEqual(false);
    });

    it('handles EMPLOYEE:FETCH__LOADING', () => {
      const action = employeeFetchLoading();
      expect(isFetchingReducer(false, action)).toEqual(true);
    });
    it('handles EMPLOYEE:FETCH__SUCCESS', () => {
      const action = employeeFetchSuccess();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
    it('handles EMPLOYEE:FETCH__ERROR', () => {
      const action = employeeFetchError();
      expect(isFetchingReducer(true, action)).toEqual(false);
    });
  });

  describe('updatingIdReducer', () => {
    it('returns the initial state', () => {
      expect(updatingIdReducer(undefined, {})).toEqual(null);
    });

    it('handles EMPLOYEE:UPDATE__LOADING', () => {
      const action = employeeUpdateLoading({id: 1}, {result: null});
      expect(updatingIdReducer(null, action)).toEqual(1);
    });
    it('handles EMPLOYEE:UPDATE__SUCCESS', () => {
      const action = employeeUpdateSuccess();
      expect(updatingIdReducer(null, action)).toEqual(null);
    });
    it('handles EMPLOYEE:UPDATE__ERROR', () => {
      const action = employeeUpdateError();
      expect(updatingIdReducer(null, action)).toEqual(null);
    });
  });

  describe('isCreatingReducer', () => {
    it('returns the initial state', () => {
      expect(isCreatingReducer(undefined, {})).toEqual(false);
    });

    it('handles EMPLOYEE:CREATE__LOADING', () => {
      const action = employeeCreateLoading();
      expect(isCreatingReducer(false, action)).toEqual(true);
    });
    it('handles EMPLOYEE:CREATE__SUCCESS', () => {
      const action = employeeCreateSuccess();
      expect(isCreatingReducer(true, action)).toEqual(false);
    });
    it('handles EMPLOYEE:CREATE__ERROR', () => {
      const action = employeeCreateError();
      expect(isCreatingReducer(true, action)).toEqual(false);
    });
  });

  describe('successfullyCreatedReducer', () => {
    it('returns the initial state', () => {
      expect(successfullyCreatedReducer(undefined, {})).toEqual(false);
    });

    it('handles EMPLOYEE:CREATE__SUCCESS', () => {
      const action = employeeCreateSuccess();
      expect(successfullyCreatedReducer(false, action)).toEqual(true);
    });
    it('handles EMPLOYEE:CREATE__ERROR', () => {
      const action = employeeCreateError();
      expect(successfullyCreatedReducer(true, action)).toEqual(false);
    });
    it('handles EMPLOYEE:RESET_NEW_EMPLOYEE_FORM', () => {
      const action = resetNewEmployeeForm();
      expect(successfullyCreatedReducer(true, action)).toEqual(false);
    });
  });

  describe('createEmployeeErrorsReducer', () => {
    it('returns the initial state', () => {
      expect(createEmployeeErrorsReducer(undefined, {})).toEqual([]);
    });

    it('handles EMPLOYEE:CREATE__ERROR', () => {
      const action = employeeCreateError({error: ['Internal Server Error']});
      expect(createEmployeeErrorsReducer([], action)).toEqual(['Internal Server Error']);
    });
    it('handles EMPLOYEE:RESET_NEW_EMPLOYEE_FORM', () => {
      const action = resetNewEmployeeForm();
      expect(createEmployeeErrorsReducer(['random error'], action)).toEqual([]);
    });
  });
});
