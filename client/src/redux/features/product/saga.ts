import { uiActions } from 'redux/features/ui/slice';
import { Product } from 'types/product';
import { call, all, put, takeEvery, delay, takeLatest } from 'redux-saga/effects';
import { productActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AddOrUpdateResponse,
  DeleteResponse,
  cloudinaryImageType,
  ListResponse,
  Response
} from 'types/common';
import {
  addDataApi,
  deleteDataApi,
  getAllDataApi,
  ratingProductApi,
  updateDataApi
} from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { imagesUpload } from 'utils/upload';
import { findIndex } from 'utils/functions';
import { CartItem, CartItems, ProductListCart } from 'types/cart';

const {
  addProduct,
  addProductSuccess,
  addProductFail,
  getProducts,
  getProductsSuccess,
  getProductsFail,
  updateProduct,
  updateProductSuccess,
  updateProductFail,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFail,
  getProductsAddOrRemoveCart,
  getProductsSearchBar,
  getProductsSearchBarSuccess,
  rating,
  ratingSuccess
} = productActions;

const { hideModal, setProgress } = uiActions;

function* getProductsSearchBarSaga(action: PayloadAction<string>) {
  try {
    if (!action.payload) {
      yield put(getProductsSearchBarSuccess([]));
    } else {
      yield delay(500);
      const res: ListResponse<Product> = yield call(
        getAllDataApi,
        ENDPOINTS.products.getAll,
        action.payload
      );
      const { status, data } = res;
      if (status === 200) {
        yield put(getProductsSearchBarSuccess(data));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* getProductsSaga() {
  try {
    yield put(setProgress(15));
    yield delay(350);
    yield put(setProgress(30));
    yield delay(300);
    yield put(setProgress(45));
    yield delay(300);
    yield put(setProgress(60));
    yield delay(250);
    yield put(setProgress(75));
    yield delay(200);
    yield put(setProgress(90));
    yield delay(200);
    yield put(setProgress(95));
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
      yield put(setProgress(100));
    }
  } catch (error) {
    console.log(error);
    yield put(getProductsFail());
    yield put(setProgress(100));
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
      yield delay(1000);
      yield put(addProductSuccess());
      yield put(hideModal());
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
      yield delay(1000);
      yield put(updateProductSuccess());
      yield put(hideModal());
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
      yield delay(1000);
      yield put(deleteProductSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteProductFail());
  }
}

function* ratingSaga(
  action: PayloadAction<{
    productId: string;
    starNumber: number;
    userId: string;
    userName: string;
    date: Date;
    message: string;
    imagesOld: any[];
    imagesNew: any[];
    images: any[];
  }>
) {
  try {
    let imagesNew: cloudinaryImageType[] = [];
    let imagesOld: cloudinaryImageType[] = action.payload.imagesOld || [];
    if (action.payload.imagesNew) {
      imagesNew = yield call(imagesUpload, action.payload.imagesNew);
    }
    action.payload.images = [...imagesOld, ...imagesNew];
    const res: Response<Product> = yield call(
      ratingProductApi,
      ENDPOINTS.products.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(getProducts());
      yield delay(500);
      yield put(ratingSuccess());
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
    takeEvery(getProductsAddOrRemoveCart, getProductsAddOrRemoveCartSaga),
    takeLatest(getProductsSearchBar, getProductsSearchBarSaga),
    takeLatest(rating, ratingSaga)
  ]);
}
