import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { deleteProductFailed, deleteProductSuccess, updateProductFailed, updateProductSuccess } from './actions';
import { apiUpdateProduct } from './api';
import * as types from './constants';


export function* deleteProduct({ payload }) {
  try {
    const res = yield call(apiUpdateProduct, [`api/foods/${payload.id}/delete`]);
    if (res.status == 200) {
      yield put(deleteProductSuccess("DELETE SUCCESSFUL"));
    } else {
      yield put(deleteProductFailed("DELETE FAILED"));
    }
  } catch (error) {
    yield put(deleteProductFailed(error.message));
  }
}

export function* updateProduct({ payload }) {
  try {
    const data = {
      name: payload.name,
      price: payload.price,
      type: payload.type,
      description: payload.description,
      image: payload.image,
      status: "Active"
    }
    const res = yield call(apiUpdateProduct, [`api/foods/${payload.id}/update`], data);
    if (res.status == 200) {
      yield put(updateProductSuccess("UPDATE SUCCESSFUL"));
    } else {
      yield put(updateProductFailed("UPDATE FAILED"));
    }
  } catch (error) {
    yield put(updateProductFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerActionProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.DELETE_PRODUCT, deleteProduct);
  yield takeEvery(types.UPDATE_PRODUCT, updateProduct);
}
