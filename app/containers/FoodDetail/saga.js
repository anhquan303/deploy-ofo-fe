import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getFoodByIdFailed, getFoodByIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getFoodById({ payload }) {
  try {

    const res = yield call(apiFetchData, [`api/store/0/foods/${payload.id}/detail`]);
    console.log(res)
    if(res.status == 200){
      yield put(getFoodByIdSuccess(res.data.data))
    }else{
      yield put(getFoodByIdFailed("Failed"))
    }
  } catch (error) {
    yield put(getFoodByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* foodDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_FOOD_BY_ID, getFoodById)
}
