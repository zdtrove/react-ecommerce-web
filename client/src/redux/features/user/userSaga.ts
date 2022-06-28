import { getUsersApi, addUserApi, updateUserApi, deleteUserApi } from 'apis/userApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { userActions } from './userSlice';

function* getUsersSaga(): any {
  try {
    const res = yield call(getUsersApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(userActions.getUsersSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
    yield put(userActions.getUsersFail());
  }
}

function* addUserSaga({ payload }: any): any {
  try {
    const res = yield call(addUserApi, payload);
    const { status } = res;
    if (status === 201) {
      yield put(userActions.getUsers());
    }
  } catch (error: any) {
    console.log(error);
    yield put(userActions.addUserFail());
  }
}

function* updateUserSaga({ payload }: any): any {
  try {
    const res = yield call(updateUserApi, payload);
    const { status } = res;
    if (status === 200) {
      yield put(userActions.getUsers());
    }
  } catch (error: any) {
    console.log(error);
    yield put(userActions.updateUserFail());
  }
}

function* deleteUserSaga({ payload }: any): any {
  try {
    const res = yield call(deleteUserApi, payload);
    const { status } = res;
    if (status === 200) {
      yield put(userActions.getUsers());
    }
  } catch (error: any) {
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
