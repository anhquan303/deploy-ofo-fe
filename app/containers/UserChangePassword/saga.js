import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { changePasswordFailed, changePasswordSuccess } from './actions';
import { apiChangePass } from './api';
import * as types from './constants';

export function* changePassword({ payload }) {
  try {
    console.log(payload)
    const data = {
      currentPassword: payload.oldPassword,
      password: payload.newPassword,
      confirmPassword: payload.verifyPassword
    }
    const res = yield call(apiChangePass, ['api/user/changePassword'], data);
    console.log(res)
    if (res.status == 200) {
      yield put(changePasswordSuccess("Success"))
    } else {
      yield put(changePasswordFailed("Failed"))
    }
  } catch (error) {
    yield put(changePasswordFailed(error.message));
  }
}

// Individual exports for testing
export default function* userChangePasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.CHANGE_PASSWORD, changePassword);
}
