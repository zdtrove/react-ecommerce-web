import { loginApi, signUpApi, getLoggedUserApi, refreshTokenApi, logoutApi } from 'apis/authApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { jwtConst } from 'constants/index';

function* loginSaga({ payload }: any): any {
  try {
    const res = yield call(loginApi, payload);
    const { status, data } = res;
    if (status === 200) {
      localStorage.setItem(jwtConst.ACCESS_TOKEN, `Bearer ${data.accessToken}`);
      yield put(authActions.loginSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
    yield put(authActions.loginFail());
  }
}

function* signUpSaga({ payload }: any): any {
  try {
    const res = yield call(signUpApi, payload);
    const { status } = res;
    if (status === 201) {
      yield put(authActions.signUpSuccess());
    }
  } catch (error: any) {
    console.log(error);
    yield put(authActions.signUpFail());
  }
}

function* getLoggedUserSaga(): any {
  try {
    const res = yield call(getLoggedUserApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(authActions.getLoggedUserSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* refreshTokenSaga(): any {
  try {
    const res = yield call(refreshTokenApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(authActions.refreshTokenSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* logoutSaga(): any {
  try {
    const res = yield call(logoutApi);
    const { status } = res;
    if (status === 200) {
      yield put(authActions.logoutSuccess());
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* authSaga() {
  yield all([
    takeEvery(authActions.login, loginSaga),
    takeEvery(authActions.signUp, signUpSaga),
    takeEvery(authActions.getLoggedUser, getLoggedUserSaga),
    takeEvery(authActions.refreshToken, refreshTokenSaga),
    takeEvery(authActions.logout, logoutSaga)
  ]);
}
