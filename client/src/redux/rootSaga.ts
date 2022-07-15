import { all } from 'redux-saga/effects';
import { authSaga } from './features/auth/saga';
import { categorySaga } from './features/category/saga';
import { productSaga } from './features/product/saga';
import { userSaga } from './features/user/saga';
import { eventSaga } from './features/event/saga';
import { storeSaga } from './features/store/saga';
import { cartSaga } from './features/cart/saga';
import { dashboardSaga } from './features/dashboard/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    productSaga(),
    userSaga(),
    eventSaga(),
    storeSaga(),
    cartSaga(),
    dashboardSaga()
  ]);
}
