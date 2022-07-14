import { Product } from 'types/product';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { productActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddOrUpdateResponse,
  DeleteResponse,
  cloudinaryImageType,
  ListResponse
} from 'types/common';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { imagesUpload } from 'utils/upload';
import { findIndex } from 'utils/functions';
import { CartItem, CartItems, ProductListCart } from 'types/cart';

function* getProductsSaga() {
  try {
    const res: ListResponse<Product> = yield call(getAllDataApi, ENDPOINTS.products.getAll);
    const { status, data } = res;
    if (status === 200) {
      const cartItems: CartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
      const tempData = [...data];
      if ('list' in cartItems) {
        cartItems.list.forEach((cartItem: CartItem) => {
          const index = findIndex(tempData, cartItem);
          if (index >= 0) {
            tempData[index].inCart = true;
          }
        });
      }
      yield put(productActions.getProductsSuccess(tempData));
    }
  } catch (error) {
    console.log(error);
    yield put(productActions.getProductsFail());
  }
}

function* getProductsAddCartSaga(action: PayloadAction<ProductListCart>) {
  try {
    const { product, products } = action.payload;
    let tempProducts = [...products];
    const itemIndex = findIndex(tempProducts, product);
    if (itemIndex >= 0) {
      const tempProduct = { ...tempProducts[itemIndex], inCart: true };
      tempProducts[itemIndex] = tempProduct;
    }
    yield put(productActions.getProductsSuccess(tempProducts));
  } catch (error) {
    console.log(error);
    yield put(productActions.getProductsFail());
  }
}

function* getProductsRemoveCartSaga(action: PayloadAction<ProductListCart>) {
  try {
    const { product, products } = action.payload;
    let tempProducts = [...products];
    const itemIndex = findIndex(tempProducts, product);
    if (itemIndex >= 0) {
      const tempProduct = { ...tempProducts[itemIndex], inCart: false };
      tempProducts[itemIndex] = tempProduct;
    }
    yield put(productActions.getProductsSuccess(tempProducts));
  } catch (error) {
    console.log(error);
    yield put(productActions.getProductsFail());
  }
}

function* addProductSaga(action: PayloadAction<Product>) {
  try {
    if (action.payload.images) {
      const images: cloudinaryImageType[] = yield call(imagesUpload, action.payload.images);
      action.payload.images = images;
    }
    const res: AddOrUpdateResponse<Product> = yield call(
      addDataApi,
      ENDPOINTS.products.getAll,
      action.payload
    );
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
    let imagesNew: cloudinaryImageType[] = [];
    let imagesOld: cloudinaryImageType[] = action.payload.imagesOld || [];
    if (action.payload.imagesNew) {
      imagesNew = yield call(imagesUpload, action.payload.imagesNew);
    }
    action.payload.images = [...imagesOld, ...imagesNew];
    const res: AddOrUpdateResponse<Product> = yield call(
      updateDataApi,
      ENDPOINTS.products.getOne,
      action.payload
    );
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
    const res: DeleteResponse<Product> = yield call(
      deleteDataApi,
      ENDPOINTS.products.getOne,
      action.payload
    );
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
    takeEvery(productActions.deleteProduct, deleteProductSaga),
    takeEvery(productActions.getProductsAddCart, getProductsAddCartSaga),
    takeEvery(productActions.getProductsRemoveCart, getProductsRemoveCartSaga)
  ]);
}
