import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getFoodByIdFailed } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getFoodById({ payload }) {
  try {
    const res = yield call(apiFetchData, []);
  } catch (error) {
    yield put(getFoodByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* foodDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_FOOD_BY_ID, getFoodById)
}
