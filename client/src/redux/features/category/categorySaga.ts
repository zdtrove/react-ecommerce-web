import {
  getCategoriesApi,
  updateCategoryApi,
  addCategoryApi,
  deleteCategoryApi
} from 'apis/categoryApi';
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
    yield put(categoryActions.getCategoriesFail());
  }
}

function* updateCategorySaga({ payload }: any): any {
  try {
    const res = yield call(updateCategoryApi, payload);
    const { status } = res;
    if (status === 200) {
      yield put(categoryActions.getCategories());
    }
  } catch (error: any) {
    console.log(error);
    yield put(categoryActions.updateCategoryFail());
  }
}

function* addCategorySaga({ payload }: any): any {
  try {
    const res = yield call(addCategoryApi, payload);
    const { status } = res;
    if (status === 201) {
      yield put(categoryActions.getCategories());
    }
  } catch (error: any) {
    console.log(error);
    yield put(categoryActions.addCategoryFail());
  }
}

function* deleteCategorySaga({ payload }: any): any {
  try {
    const res = yield call(deleteCategoryApi, payload);
    const { status } = res;
    if (status === 200) {
      yield put(categoryActions.getCategories());
    }
  } catch (error: any) {
    console.log(error);
    yield put(categoryActions.deleteCategoryFail());
  }
}

export function* categorySaga() {
  yield all([
    takeEvery(categoryActions.getCategories, getCategoriesSaga),
    takeEvery(categoryActions.updateCategory, updateCategorySaga),
    takeEvery(categoryActions.addCategory, addCategorySaga),
    takeEvery(categoryActions.deleteCategory, deleteCategorySaga)
  ]);
}
