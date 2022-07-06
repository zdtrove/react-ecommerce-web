import { Category } from 'types/category';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { categoryActions } from './categorySlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddOrUpdateResponse,
  cloudinaryImageType,
  DeleteResponse,
  ListResponse
} from 'types/common';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { imageUpload } from 'utils/upload';

function* getCategoriesSaga() {
  try {
    const res: ListResponse<Category> = yield call(getAllDataApi, ENDPOINTS.categories.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(categoryActions.getCategoriesSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(categoryActions.getCategoriesFail());
  }
}

function* updateCategorySaga(action: PayloadAction<Category>) {
  try {
    if (action.payload.image) {
      const image: cloudinaryImageType = yield call(imageUpload, action.payload.image);
      action.payload.image = image.url;
    }
    const res: AddOrUpdateResponse<Category> = yield call(
      updateDataApi,
      ENDPOINTS.categories.getOne,
      action.payload
    );
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
    if (action.payload.image) {
      const image: cloudinaryImageType = yield call(imageUpload, action.payload.image);
      action.payload.image = image.url;
    }
    const res: AddOrUpdateResponse<Category> = yield call(
      addDataApi,
      ENDPOINTS.categories.getAll,
      action.payload
    );
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
    const res: DeleteResponse<Category> = yield call(
      deleteDataApi,
      ENDPOINTS.categories.getOne,
      action.payload
    );
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
