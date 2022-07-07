import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchListFoodFailed } from './actions';
import { apiFetchData, apiSignup } from './api';
import * as types from './constants';

export function* logOut({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/logout']);
  } catch (error) {
    yield put(logOutFailed(error.message));
  }
}

export function* fetchListFood({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/foods']);
    console.log(res)
  } catch (error) {
    yield put(fetchListFoodFailed(error.message));
  }
}
// Individual exports for testing
export default function* userHomePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.LOG_OUT, logOut)
  yield takeEvery(types.FETCH_LIST_FOOD, fetchListFood)
}
