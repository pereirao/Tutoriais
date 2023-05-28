import { takeEvery, call, put } from 'redux-saga/effects';
import {
  SetExtrasRoutine
} from './extras.dux';
import {
  addExtras
} from '../networking/api';

export default function* extrasSaga(){
  yield takeEvery(SetExtrasRoutine.TRIGGER, SetExtrasSaga);
}

function* SetExtrasSaga({ payload }){
  try {
    yield call(addExtras, payload.order_id, payload.data);
    yield put(SetExtrasRoutine.success(undefined, payload));
  } catch (e){
    yield put(SetExtrasRoutine.failure(e, payload));
  }
  yield put(SetExtrasRoutine.fulfill(payload));
}

export { extrasSaga };
