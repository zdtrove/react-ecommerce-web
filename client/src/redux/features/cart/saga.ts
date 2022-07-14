import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeEvery } from 'redux-saga/effects';
import { CartItem, ProductListCart } from 'types/cart';
import { productActions } from '../product/slice';
import { uiActions } from '../ui/slice';
import { cartActions } from './slice';

function* addToCartSaga(action: PayloadAction<ProductListCart>) {
  try {
    yield put(cartActions.addToCartSuccess(action.payload));
    yield put(productActions.getProductsAddCart(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* decrementSaga(action: PayloadAction<ProductListCart>) {
  try {
    const { product } = action.payload;
    if (product.quantity! > 1) {
      yield put(cartActions.decrementSuccess(product));
    } else {
      yield put(cartActions.removeSuccess(action.payload));
      yield put(productActions.getProductsRemoveCart(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* incrementSaga(action: PayloadAction<CartItem>) {
  try {
    if (action.payload.quantity! < action.payload.inventory!) {
      yield put(cartActions.incrementSuccess(action.payload));
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
    yield put(cartActions.removeSuccess(action.payload));
    yield put(productActions.getProductsRemoveCart(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* cartSaga() {
  yield all([
    takeEvery(cartActions.decrement, decrementSaga),
    takeEvery(cartActions.increment, incrementSaga),
    takeEvery(cartActions.addToCart, addToCartSaga),
    takeEvery(cartActions.remove, removeSaga)
  ]);
}
