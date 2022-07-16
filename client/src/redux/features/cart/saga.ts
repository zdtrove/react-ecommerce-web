import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeEvery } from 'redux-saga/effects';
import { CartItem, ProductListCart } from 'types/cart';
import { productActions } from '../product/slice';
import { uiActions } from '../ui/slice';
import { cartActions } from './slice';

const {
  addToCart,
  addToCartSuccess,
  increment,
  incrementSuccess,
  decrement,
  decrementSuccess,
  remove,
  removeSuccess,
  clear,
  clearSuccess
} = cartActions;

const { getProductsAddOrRemoveCart, getProductsClearCart } = productActions;

function* addToCartSaga(action: PayloadAction<ProductListCart>) {
  try {
    yield put(addToCartSuccess(action.payload.product));
    yield put(getProductsAddOrRemoveCart(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* decrementSaga(action: PayloadAction<ProductListCart>) {
  try {
    const { product } = action.payload;
    if (product.quantity! > 1) {
      yield put(decrementSuccess(product));
    } else {
      yield put(removeSuccess(product));
      yield put(getProductsAddOrRemoveCart(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* incrementSaga(action: PayloadAction<CartItem>) {
  try {
    if (action.payload.quantity! < action.payload.inventory!) {
      yield put(incrementSuccess(action.payload));
    } else {
      yield put(
        uiActions.showSnackbar({ message: `Only ${action.payload.inventory} products in stock` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* removeSaga(action: PayloadAction<ProductListCart>) {
  try {
    yield put(removeSuccess(action.payload.product));
    yield put(getProductsAddOrRemoveCart(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* clearSaga() {
  try {
    yield put(clearSuccess());
    yield put(getProductsClearCart());
  } catch (error) {
    console.log(error);
  }
}

export function* cartSaga() {
  yield all([
    takeEvery(decrement, decrementSaga),
    takeEvery(increment, incrementSaga),
    takeEvery(addToCart, addToCartSaga),
    takeEvery(remove, removeSaga),
    takeEvery(clear, clearSaga)
  ]);
}
