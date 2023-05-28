import { takeEvery, call, put } from 'redux-saga/effects';
import {
  SearchSubstituteRoutine,
  SetSubstituteRoutine
} from './substitute.dux';
import {
  fetchSubstitutes,
  createSubstitution
} from '../networking/api';
import { fetchOrder } from '../order/actions';

export default function* substituteSaga(){
  yield takeEvery(SearchSubstituteRoutine.TRIGGER, SearchSubstituteSaga);
  yield takeEvery(SetSubstituteRoutine.TRIGGER, SetSubstituteSaga);
}

function* SearchSubstituteSaga({ payload }){
  try {
    const response = yield call(fetchSubstitutes, payload);
    yield put(SearchSubstituteRoutine.success(response));
  } catch (e){
    yield put(SearchSubstituteRoutine.failure(e));
  }
  yield put(SearchSubstituteRoutine.fulfill());
}

function* SetSubstituteSaga({ payload }){
  try {
    const result = yield call(createSubstitution, payload);
    yield put(SetSubstituteRoutine.success(result, payload));
    yield put({ type: 'ORDER:UPDATE_ORDER__SUCCESS', payload: result });
  } catch (e){
    console.error(e);
    yield put(SetSubstituteRoutine.failure(e, payload));
  }
  yield put(SetSubstituteRoutine.fulfill(payload));
  yield put(fetchOrder(payload.shipmentId));
}
