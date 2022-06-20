import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './actions';
import { apiLogin } from './api';
import * as types from './constants';
import apiBase from '../../utils/baseAPI';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import { useHistory } from 'react-router-dom';


export function* login({ payload }) {
  try {
    console.log(payload)
    const data = {
      username: payload.username,
      password: payload.password
    }


    const res = yield call(apiLogin, ['auth/login'], data);
    console.log(res)
    if (res.status == 200) {
      console.log(res.data.accessToken)
      console.log(res.data.user)
      setUserSession(res.data.accessToken, res.data.user)
      console.log('done')
      yield put(loginSuccess("Login success"))
      
      
    } else {
      yield put(loginFailed("Login failed"))
    }


  } catch (error) {
    yield put(loginFailed(error.message));
  }

}



// Individual exports for testing
export default function* loginSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.LOGIN, login);
}
