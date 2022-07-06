import { PayloadAction } from '@reduxjs/toolkit';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AddOrUpdateResponse, DeleteResponse, ListResponse } from 'types/common';
import { Store } from 'types/store';
import { storeActions } from './storeSlice';

function* getStoresSaga() {
  try {
    const res: ListResponse<Store> = yield call(getAllDataApi, ENDPOINTS.stores.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(storeActions.getStoresSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(storeActions.getStoresFail());
  }
}

function* addStoreSaga(action: PayloadAction<Store>) {
  try {
    const res: AddOrUpdateResponse<Store> = yield call(
      addDataApi,
      ENDPOINTS.stores.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(storeActions.getStores());
    }
  } catch (error) {
    console.log(error);
    yield put(storeActions.addStoreFail());
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
      yield put(storeActions.getStores());
    }
  } catch (error) {
    console.log(error);
    yield put(storeActions.updateStoreFail());
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
      yield put(storeActions.getStores());
    }
  } catch (error) {
    console.log(error);
    yield put(storeActions.deleteStoreFail());
  }
}

export function* storeSaga() {
  yield all([
    takeEvery(storeActions.getStores, getStoresSaga),
    takeEvery(storeActions.addStore, addStoreSaga),
    takeEvery(storeActions.updateStore, updateStoreSaga),
    takeEvery(storeActions.deleteStore, deleteStoreSaga)
  ]);
}
