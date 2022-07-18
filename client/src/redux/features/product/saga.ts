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

const {
  addProduct,
  addProductFail,
  getProducts,
  getProductsSuccess,
  getProductsFail,
  updateProduct,
  updateProductFail,
  deleteProduct,
  deleteProductFail,
  getProductsAddOrRemoveCart
  // getProductsSearchBar,
  // getProductsSearchBarSuccess
} = productActions;

// function* getProductsSearchBarSaga(action: PayloadAction<string>) {
//   delay(1000);
//   yield getProductsSearchBarSuccess();
// }

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
      yield put(getProductsSuccess(tempData));
    }
  } catch (error) {
    console.log(error);
    yield put(getProductsFail());
  }
}

function* getProductsAddOrRemoveCartSaga(action: PayloadAction<ProductListCart>) {
  try {
    const { product, products, inCart } = action.payload;
    let tempProducts = [...products];
    const itemIndex = findIndex(tempProducts, product);
    if (itemIndex >= 0) {
      const tempProduct = { ...tempProducts[itemIndex], inCart };
      tempProducts[itemIndex] = tempProduct;
    }
    yield put(getProductsSuccess(tempProducts));
  } catch (error) {
    console.log(error);
    yield put(getProductsFail());
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
      yield put(getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(addProductFail());
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
      yield put(getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(updateProductFail());
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
      yield put(getProducts());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteProductFail());
  }
}

export function* productSaga() {
  yield all([
    takeEvery(getProducts, getProductsSaga),
    takeEvery(addProduct, addProductSaga),
    takeEvery(updateProduct, updateProductSaga),
    takeEvery(deleteProduct, deleteProductSaga),
    takeEvery(getProductsAddOrRemoveCart, getProductsAddOrRemoveCartSaga)
  ]);
}
