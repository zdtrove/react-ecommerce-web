import { Category } from 'types/category';
import { call, all, put, takeEvery, delay } from 'redux-saga/effects';
import { categoryActions } from './slice';
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
import { uiActions } from '../ui/slice';

const {
  addCategory,
  addCategorySuccess,
  addCategoryFail,
  getCategories,
  getCategoriesSuccess,
  getCategoriesFail,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail
} = categoryActions;

const { hideModal } = uiActions;

function* getCategoriesSaga() {
  try {
    const res: ListResponse<Category> = yield call(getAllDataApi, ENDPOINTS.categories.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(getCategoriesSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(getCategoriesFail());
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
      yield put(getCategories());
      yield delay(1000);
      yield put(updateCategorySuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(updateCategoryFail());
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
      yield put(getCategories());
      yield delay(1000);
      yield put(addCategorySuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(addCategoryFail());
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
      yield put(getCategories());
      yield delay(1000);
      yield put(deleteCategorySuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteCategoryFail());
  }
}

export function* categorySaga() {
  yield all([
    takeEvery(getCategories, getCategoriesSaga),
    takeEvery(updateCategory, updateCategorySaga),
    takeEvery(addCategory, addCategorySaga),
    takeEvery(deleteCategory, deleteCategorySaga)
  ]);
}
