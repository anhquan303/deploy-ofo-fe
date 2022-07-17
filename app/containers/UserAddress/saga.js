import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addLocationFailed, addLocationSuccess, deleteLocationFailed, deleteLocationSuccess, getAllLocationFailed,
  getAllLocationSuccess, getListWardsFailed, getListWardsSuccess, getLocationByIdFailed, getLocationByIdSuccess,
  updateLocationFailed, updateLocationSuccess
} from './actions';
import { apiDelete, apiFetchData, apiGetListWards, apiPost } from './api';
import * as types from './constants';

export function* getAllLocation({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/location/allLocation']);
    if (res.status == 200) {
      yield put(getAllLocationSuccess(res.data.data))
    } else {
      yield put(getAllLocationFailed("FAILED"))
    }
  } catch (error) {
    yield put(getAllLocationFailed(error.message));
  }
}

export function* getListWards({ payload }) {
  try {
    const res = yield call(apiGetListWards, []);
    if (res.status == 200) {
      yield put(getListWardsSuccess(res.data.wards))
    } else {
      yield put(getListWardsFailed("FAILED"))
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

export function* addLocation({ payload }) {
  try {
    const res = yield call(apiPost, [`api/location/insert/location`], payload);
    if (res.status == 200) {
      yield put(addLocationSuccess("ADD SUCCESS"));
    } else {
      yield put(addLocationFailed("ADD FAILED"));
    }
  } catch (error) {
    yield put(addLocationFailed(error.message));
  }
}

export function* getLocationById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationById/${payload.id}`]);
    if (res.status == 200) {
      yield put(getLocationByIdSuccess(res.data.data));
    } else {
      yield put(getLocationByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getLocationByIdFailed(error.message));
  }
}

export function* updateLocation({ payload }) {
  try {
    const body = {
      name: payload.name,
      village: payload.village
    }
    const res = yield call(apiPost, [`api/location/updateLocation?locationId=${payload.id}`], body);
    if (res.status == 200) {
      yield put(updateLocationSuccess("UPDATE SUCCESS"));
    } else {
      yield put(updateLocationFailed("UPDATE FAILED"));
    }
  } catch (error) {
    yield put(updateLocationFailed(error.message));
  }
}

export function* deleteLocation({ payload }) {
  try {
    const res = yield call(apiDelete, [`api/location/deleteLocation/${payload.id}`]);
    if (res.status == 200) {
      yield put(deleteLocationSuccess("DELETE SUCCESS"));
    } else {
      yield put(deleteLocationFailed("DELETE FAILED"));
    }
  } catch (error) {
    yield put(deleteLocationFailed(error.message));
  }
}
// Individual exports for testing
export default function* userAddressSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_LOCATION, getAllLocation);
  yield takeEvery(types.GET_LIST_WARDS, getListWards);
  yield takeEvery(types.ADD_LOCATION, addLocation);
  yield takeEvery(types.GET_LOCATION_BY_ID, getLocationById);
  yield takeEvery(types.UPDATE_LOCATION, updateLocation);
  yield takeEvery(types.DELETE_LOCATION, deleteLocation);
}
