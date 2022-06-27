import { getUsersApi } from 'apis/userApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { userActions } from './userSlice';

function* getUsersSaga(): any {
  try {
    const res = yield call(getUsersApi);
    console.log(res);
    const { status, data } = res;
    if (status === 200) {
      yield put(userActions.getUsersSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
    yield put(userActions.getUsersFail());
  }
}

export function* userSaga() {
  yield all([takeEvery(userActions.getUsers, getUsersSaga)]);
}
