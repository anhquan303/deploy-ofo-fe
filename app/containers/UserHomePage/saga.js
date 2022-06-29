import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { apiSignup } from './api';
import * as types from './constants';

export function* logOut({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/logout']);
    console.log(res)
  } catch (error) {
    yield put(logOutFailed(error.message));
  }
}
// Individual exports for testing
export default function* userHomePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.LOG_OUT, logOut)
}
