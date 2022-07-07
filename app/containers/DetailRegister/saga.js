import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { approvedStoreFailed, approvedStoreSuccess, declinedStoreFailed, declinedStoreSuccess } from './actions';
import { apiChangeStatus } from './api';
import * as types from './constants';

export function* approvedStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/approved`]);
    if (res.status == 200) {
      yield put(approvedStoreSuccess("Success"))
    } else {
      yield put(approvedStoreFailed("Error"))
    }
  } catch (error) {
    yield put(approvedStoreFailed(error.message));
  }
}

export function* declinedStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/declined`]);
    if (res.status == 200) {
      yield put(declinedStoreSuccess("Success"))
    } else {
      yield put(declinedStoreFailed("Error"))
    }
  } catch (error) {
    yield put(declinedStoreFailed(error.message));
  }
}

// Individual exports for testing
export default function* detailRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.APPROVED_STORE, approvedStore);
  yield takeEvery(types.DECLINED_STORE, declinedStore);
}
