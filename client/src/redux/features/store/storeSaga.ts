import { PayloadAction } from '@reduxjs/toolkit';
import { getStoresApi, addStoreApi, updateStoreApi, deleteStoreApi } from 'apis/storeApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import {
  AddOrUpdateStoreResponse,
  DeleteStoreResponse,
  GetAllStoresResponse,
  Store
} from 'types/store';
import { storeActions } from './storeSlice';

function* getStoresSaga() {
  try {
    const res: GetAllStoresResponse = yield call(getStoresApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(storeActions.getStoresSuccess(data.stores));
    }
  } catch (error) {
    console.log(error);
    yield put(storeActions.getStoresFail());
  }
}

function* addStoreSaga(action: PayloadAction<Store>) {
  try {
    const res: AddOrUpdateStoreResponse = yield call(addStoreApi, action.payload);
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
    const res: AddOrUpdateStoreResponse = yield call(updateStoreApi, action.payload);
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
    const res: DeleteStoreResponse = yield call(deleteStoreApi, action.payload);
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
