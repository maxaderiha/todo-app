import { all } from 'redux-saga/effects';
import { saga as categoriesSaga } from '../ducks/categories';


export default function* rootSaga() {
  yield all([
    categoriesSaga(),
  ]);
}
