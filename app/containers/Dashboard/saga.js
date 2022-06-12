import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getDataFailed, getDataSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';




export function* getData({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/users?page=2']);

    console.log('res', res)
    if(res.status == 200){
      yield put(getDataSuccess(res.data.data));
      console.log('success')
    }else{
      yield put(getDataFailed("error"));
    }
  } catch (error) {
    yield put(getDataFailed(error.message));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_DATA, getData);
}




