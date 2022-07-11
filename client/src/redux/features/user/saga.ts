import { AddOrUpdateResponse } from 'types/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { DeleteResponse, ListResponse } from 'types/common';
import { User } from 'types/user';
import { userActions } from './slice';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';

function* getUsersSaga() {
  try {
    const res: ListResponse<User> = yield call(getAllDataApi, ENDPOINTS.users.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(userActions.getUsersSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.getUsersFail());
  }
}

function* addUserSaga(action: PayloadAction<User>) {
  try {
    const res: AddOrUpdateResponse<User> = yield call(
      addDataApi,
      ENDPOINTS.users.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(userActions.getUsers());
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.addUserFail());
  }
}

function* updateUserSaga(action: PayloadAction<User>) {
  try {
    const res: AddOrUpdateResponse<User> = yield call(
      updateDataApi,
      ENDPOINTS.users.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(userActions.getUsers());
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.updateUserFail());
  }
}

function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    const res: DeleteResponse<User> = yield call(
      deleteDataApi,
      ENDPOINTS.users.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(userActions.getUsers());
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.deleteUserFail());
  }
}

export function* userSaga() {
  yield all([
    takeEvery(userActions.getUsers, getUsersSaga),
    takeEvery(userActions.addUser, addUserSaga),
    takeEvery(userActions.updateUser, updateUserSaga),
    takeEvery(userActions.deleteUser, deleteUserSaga)
  ]);
}
