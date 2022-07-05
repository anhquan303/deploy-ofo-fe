import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { sellerSignUpFailed, sellerSignUpSuccess } from './actions';
import { apiSignup } from './api';
import * as types from './constants';

export function* sellerSignUp({ payload }) {
  try {
    console.log(payload)
    const data = {
      name: payload.name,
    }
    const res = yield call(apiSignup, ['api/store/register'], payload)
    if (res.status == 200) {
      yield put(sellerSignUpSuccess("Bạn đã đăng ký thành công, vui lòng chờ để dược duyệt, kết quả sẽ được trả về email"))
    } else {
      yield put(sellerSignUpFailed("Bạn đã đăng ký không thành công"))
    }
  } catch (error) {
    yield put(sellerSignUpFailed(error.message));
  }
}


// Individual exports for testing
export default function* sellerRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.SELLER_SIGNUP, sellerSignUp);
}
