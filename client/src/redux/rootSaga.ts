import { authSaga } from './features/auth/authSaga';
import { categorySaga } from './features/category/categorySaga';
import { userSaga } from './features/user/userSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), userSaga()]);
}
