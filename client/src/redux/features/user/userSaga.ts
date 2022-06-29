import { PayloadAction } from '@reduxjs/toolkit';
import { getUsersApi, addUserApi, updateUserApi, deleteUserApi } from 'apis/userApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AddOrUpdateUserResponse, DeleteUserResponse, GetAllUsersResponse, User } from 'types/user';
import { userActions } from './userSlice';

function* getUsersSaga() {
  try {
    const res: GetAllUsersResponse = yield call(getUsersApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(userActions.getUsersSuccess(data.users));
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.getUsersFail());
  }
}

function* addUserSaga(action: PayloadAction<User>) {
  try {
    const res: AddOrUpdateUserResponse = yield call(addUserApi, action.payload);
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
    const res: AddOrUpdateUserResponse = yield call(updateUserApi, action.payload);
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
    const res: DeleteUserResponse = yield call(deleteUserApi, action.payload);
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
