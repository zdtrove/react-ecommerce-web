import { Category, DeleteCategoryResponse, UpdateCategoryResponse } from 'types/category';
import { GetAllCategoryResponse } from 'types/category';
import {
  getCategoriesApi,
  updateCategoryApi,
  addCategoryApi,
  deleteCategoryApi
} from 'apis/categoryApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { categoryActions } from './categorySlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getCategoriesSaga() {
  try {
    const res: GetAllCategoryResponse = yield call(getCategoriesApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(categoryActions.getCategoriesSuccess(data.categories));
    }
  } catch (error) {
    console.log(error);
    yield put(categoryActions.getCategoriesFail());
  }
}

function* updateCategorySaga(action: PayloadAction<Category>) {
  try {
    const res: UpdateCategoryResponse = yield call(updateCategoryApi, action.payload);
    const { status } = res;
    if (status === 200) {
      yield put(categoryActions.getCategories());
    }
  } catch (error) {
    console.log(error);
    yield put(categoryActions.updateCategoryFail());
  }
}

function* addCategorySaga(action: PayloadAction<Category>) {
  try {
    const res: UpdateCategoryResponse = yield call(addCategoryApi, action.payload);
    const { status } = res;
    if (status === 201) {
      yield put(categoryActions.getCategories());
    }
  } catch (error) {
    console.log(error);
    yield put(categoryActions.addCategoryFail());
  }
}

function* deleteCategorySaga(action: PayloadAction<string>) {
  try {
    const res: DeleteCategoryResponse = yield call(deleteCategoryApi, action.payload);
    const { status } = res;
    if (status === 200) {
      yield put(categoryActions.getCategories());
    }
  } catch (error) {
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
