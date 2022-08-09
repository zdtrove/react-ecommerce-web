import { AddOrUpdateResponse } from 'types/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, all, put, takeEvery, delay } from 'redux-saga/effects';
import { DeleteResponse, ListResponse } from 'types/common';
import { User } from 'types/user';
import { userActions } from './slice';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { uiActions } from 'redux/features/ui/slice';

const {
  addUser,
  addUserSuccess,
  addUserFail,
  getUsers,
  getUsersSuccess,
  getUsersFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUserFail,
  deleteUser,
  deleteUserSuccess
} = userActions;

const { hideModal } = uiActions;

function* getUsersSaga() {
  try {
    const res: ListResponse<User> = yield call(getAllDataApi, ENDPOINTS.users.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(getUsersSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(getUsersFail());
  }
}

function* addUserSaga(action: PayloadAction<User>) {
  try {
    const res: AddOrUpdateResponse<User> = yield call(
      addDataApi,
      ENDPOINTS.users.getAll,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(getUsers());
      yield delay(1000);
      yield put(addUserSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(addUserFail());
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
      yield put(getUsers());
      yield delay(1000);
      yield put(updateUserSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(updateUserFail());
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
      yield put(getUsers());
      yield delay(1000);
      yield put(deleteUserSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteUserFail());
  }
}

export function* userSaga() {
  yield all([
    takeEvery(getUsers, getUsersSaga),
    takeEvery(addUser, addUserSaga),
    takeEvery(updateUser, updateUserSaga),
    takeEvery(deleteUser, deleteUserSaga)
  ]);
}
