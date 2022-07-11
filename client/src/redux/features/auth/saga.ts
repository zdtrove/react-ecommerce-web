import { loginApi, signUpApi, getLoggedUserApi, refreshTokenApi, logoutApi } from 'apis/authApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { authActions } from './slice';
import { jwtConst, userRoles, ROUTES } from 'constants/index';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  SignUpPayload,
  SignUpResponse
} from 'types/auth';

const { ACCESS_TOKEN } = jwtConst;
const { USER } = userRoles;

function* loginSaga(action: PayloadAction<LoginPayload>) {
  try {
    const res: LoginResponse = yield call(loginApi, action.payload);
    const { status, data } = res;
    if (status === 200) {
      localStorage.setItem(jwtConst.ACCESS_TOKEN, `Bearer ${data.accessToken}`);
      yield put(authActions.loginSuccess(data.user));
    }
  } catch (error) {
    console.log(error);
    yield put(authActions.loginFail());
  }
}

function* signUpSaga(action: PayloadAction<SignUpPayload>) {
  try {
    const res: SignUpResponse = yield call(signUpApi, action.payload);
    const { status } = res;
    if (status === 201) {
      yield put(authActions.signUpSuccess());
    }
  } catch (error) {
    console.log(error);
    yield put(authActions.signUpFail());
  }
}

function* getLoggedUserSaga() {
  try {
    const res: LoginResponse = yield call(getLoggedUserApi);
    if (res) {
      const { status, data } = res;
      if (status === 200) {
        yield put(authActions.getLoggedUserSuccess(data.user));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* refreshTokenSaga() {
  try {
    const res: LoginResponse = yield call(refreshTokenApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(authActions.refreshTokenSuccess(data.user));
      localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`);
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutSaga(action: PayloadAction<any>) {
  try {
    const res: LogoutResponse = yield call(logoutApi);
    const { status } = res;
    if (status === 200) {
      yield put(authActions.logoutSuccess());
      const { history, role } = action.payload;
      history.push(role === USER ? ROUTES.home.login : ROUTES.admin.login);
      localStorage.removeItem(ACCESS_TOKEN);
    }
  } catch (error) {
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
