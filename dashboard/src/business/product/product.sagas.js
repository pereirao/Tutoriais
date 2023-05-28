import { takeEvery, call, put } from 'redux-saga/effects';
import {
  SearchProductRoutine,
  MergeProductRoutine
} from './product.dux';
import {
  fetchProducts,
  mergeProduct
} from '../networking/api';
import { fetchVariants } from '../variant/actions';

export default function* productSaga(){
  yield takeEvery(SearchProductRoutine.TRIGGER, SearchProductSaga);
  yield takeEvery(MergeProductRoutine.TRIGGER, MergeProductSaga);
}

function* SearchProductSaga({ payload }){
  try {
    const response = yield call(fetchProducts, payload);
    yield put(SearchProductRoutine.success(response));
  } catch (e){
    yield put(SearchProductRoutine.failure(e));
  }
  yield put(SearchProductRoutine.fulfill());
}

function* MergeProductSaga({ payload }){
  try {
    const result = yield call(mergeProduct, payload);
    yield put(MergeProductRoutine.success(result, payload));
    // yield put({ type: 'ORDER:UPDATE_ORDER__SUCCESS', payload: result });
  } catch (e){
    console.error(e);
    yield put(MergeProductRoutine.failure(e, payload));
  }
  yield put(MergeProductRoutine.fulfill(payload));
  yield put(fetchVariants({ query: '', page: 1, in_stock: null, is_active: false }));
}
