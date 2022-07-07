import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { changePasswordFailed } from './actions';
import { apiChangePass } from './api';
import * as types from './constants';

export function* changePassword({ payload }) {
  try {
    //const res = yield call(apiChangePass, ['auth/changePassword']);
  } catch (error) {
    yield put(changePasswordFailed(error.message));
  }
}

// Individual exports for testing
export default function* userChangePasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.CHANGE_PASSWORD, changePassword);
}
