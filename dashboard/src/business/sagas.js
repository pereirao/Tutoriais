import { all } from 'redux-saga/effects';
import substituteSaga from './substitute/substitute.sagas';
import productSaga from './product/product.sagas';
import extrasSaga from './extras/extras.sagas';

export default function* rootSaga(){
  yield all([
    substituteSaga(),
    productSaga(),
    extrasSaga()
  ]);
}
