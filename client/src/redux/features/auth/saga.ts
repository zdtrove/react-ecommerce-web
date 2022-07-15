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
const {
  signUp,
  signUpSuccess,
  signUpFail,
  login,
  loginSuccess,
  loginFail,
  getLoggedUser,
  getLoggedUserSuccess,
  refreshToken,
  refreshTokenSuccess,
  logout,
  logoutSuccess
} = authActions;

function* loginSaga(action: PayloadAction<LoginPayload>) {
  try {
    const res: LoginResponse = yield call(loginApi, action.payload);
    const { status, data } = res;
    if (status === 200) {
      localStorage.setItem(jwtConst.ACCESS_TOKEN, `Bearer ${data.accessToken}`);
      yield put(loginSuccess(data.user));
    }
  } catch (error) {
    console.log(error);
    yield put(loginFail());
  }
}

function* signUpSaga(action: PayloadAction<SignUpPayload>) {
  try {
    const res: SignUpResponse = yield call(signUpApi, action.payload);
    const { status } = res;
    if (status === 201) {
      yield put(signUpSuccess());
    }
  } catch (error) {
    console.log(error);
    yield put(signUpFail());
  }
}

function* getLoggedUserSaga() {
  try {
    const res: LoginResponse = yield call(getLoggedUserApi);
    if (res) {
      const { status, data } = res;
      if (status === 200) {
        yield put(getLoggedUserSuccess(data.user));
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
      yield put(refreshTokenSuccess(data.user));
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
      yield put(logoutSuccess());
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
    takeEvery(login, loginSaga),
    takeEvery(signUp, signUpSaga),
    takeEvery(getLoggedUser, getLoggedUserSaga),
    takeEvery(refreshToken, refreshTokenSaga),
    takeEvery(logout, logoutSaga)
  ]);
}
