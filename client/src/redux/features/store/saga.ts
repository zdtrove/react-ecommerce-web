import { PayloadAction } from '@reduxjs/toolkit';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { call, all, put, takeEvery, delay } from 'redux-saga/effects';
import { AddOrUpdateResponse, DeleteResponse, ListResponse } from 'types/common';
import { Store } from 'types/store';
import { uiActions } from '../ui/slice';
import { storeActions } from './slice';

const {
  addStore,
  addStoreSuccess,
  addStoreFail,
  getStores,
  getStoresSuccess,
  getStoresFail,
  updateStore,
  updateStoreSuccess,
  updateStoreFail,
  deleteStore,
  deleteStoreSuccess,
  deleteStoreFail
} = storeActions;

const { hideModal } = uiActions;

function* getStoresSaga() {
  try {
    const res: ListResponse<Store> = yield call(getAllDataApi, ENDPOINTS.stores.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(getStoresSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(getStoresFail());
  }
}

function* addStoreSaga(action: PayloadAction<Store>) {
  try {
    const res: AddOrUpdateResponse<Store> = yield call(
      addDataApi,
      ENDPOINTS.stores.getAll,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(getStores());
      yield delay(1000);
      yield put(addStoreSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(addStoreFail());
  }
}

function* updateStoreSaga(action: PayloadAction<Store>) {
  try {
    const res: AddOrUpdateResponse<Store> = yield call(
      updateDataApi,
      ENDPOINTS.stores.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(getStores());
      yield delay(1000);
      yield put(updateStoreSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(updateStoreFail());
  }
}

function* deleteStoreSaga(action: PayloadAction<string>) {
  try {
    const res: DeleteResponse<Store> = yield call(
      deleteDataApi,
      ENDPOINTS.stores.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(getStores());
      yield delay(1000);
      yield put(deleteStoreSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteStoreFail());
  }
}

export function* storeSaga() {
  yield all([
    takeEvery(getStores, getStoresSaga),
    takeEvery(addStore, addStoreSaga),
    takeEvery(updateStore, updateStoreSaga),
    takeEvery(deleteStore, deleteStoreSaga)
  ]);
}
