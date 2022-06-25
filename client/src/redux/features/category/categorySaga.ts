import { getCategoriesApi } from 'apis/categoryApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { categoryActions } from './categorySlice';

function* getCategoriesSaga(): any {
  try {
    const res = yield call(getCategoriesApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(categoryActions.getCategoriesSuccess(data));
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* categorySaga() {
  yield all([takeEvery(categoryActions.getCategories, getCategoriesSaga)]);
}
