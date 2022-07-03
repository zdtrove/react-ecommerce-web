import { Product } from 'types/product';
import { GetAllProductResponse, UpdateProductResponse, DeleteProductResponse } from 'types/product';
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi } from 'apis/productApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { productActions } from './productSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getProductsSaga() {
  try {
    const res: GetAllProductResponse = yield call(getProductsApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(productActions.getProductsSuccess(data.products));
    }
  } catch (error) {
    console.log(error);
    yield put(productActions.getProductsFail());
  }
}

function* addProductSaga(action: PayloadAction<Product>) {
  try {
    const res: UpdateProductResponse = yield call(addProductApi, action.payload);
    const { status } = res;
    if (status === 201) {
      yield put(productActions.getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(productActions.addProductFail());
  }
}

function* updateProductSaga(action: PayloadAction<Product>) {
  try {
    const res: UpdateProductResponse = yield call(updateProductApi, action.payload);
    const { status } = res;
    if (status === 200) {
      yield put(productActions.getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(productActions.updateProductFail());
  }
}

function* deleteProductSaga(action: PayloadAction<string>) {
  try {
    const res: DeleteProductResponse = yield call(deleteProductApi, action.payload);
    const { status } = res;
    if (status === 200) {
      yield put(productActions.getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(productActions.deleteProductFail());
  }
}

export function* productSaga() {
  yield all([
    takeEvery(productActions.getProducts, getProductsSaga),
    takeEvery(productActions.addProduct, addProductSaga),
    takeEvery(productActions.updateProduct, updateProductSaga),
    takeEvery(productActions.deleteProduct, deleteProductSaga)
  ]);
}
