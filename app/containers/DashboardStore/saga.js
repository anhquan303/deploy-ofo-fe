import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getAllStoreFailed, getAllStoreSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getAllStoree({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/users?page=2']);
    if(res.status == 200){
      yield put(getAllStoreSuccess(res.data.data))
      console.log(res.data.data)
    }else{
      yield put(getAllStoreFailed("error"))
    }
  } catch (error) {
    yield put(getAllStoreFailed(error.message));
  }
}

// Individual exports for testing
export default function* dashboardStoreSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_STORE, getAllStoree);
}
