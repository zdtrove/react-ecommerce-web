/* eslint-disable no-unused-vars */
import { login } from 'apis/authApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { jwtConst } from 'constants/index';

function* loginSaga(payload: any): any {
  try {
    const res = yield call(login, {
      email: payload.payload.email,
      password: payload.payload.password
    });
    const { status, data } = res;
    if (status === 200) {
      localStorage.setItem(jwtConst.ACCESS_TOKEN, `Bearer ${data.accessToken}`);
      yield put(authActions.loginSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* authSaga() {
  yield all([takeEvery(authActions.login, loginSaga)]);
}
