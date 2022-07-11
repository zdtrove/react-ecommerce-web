import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeEvery } from 'redux-saga/effects';
import { CartItemType } from 'types/cart';
import { uiActions } from '../ui/slice';
import { cartActions } from './slice';

function* decrementSaga(action: PayloadAction<CartItemType>) {
  try {
    if (action.payload.quantity > 1) {
      yield put(cartActions.decrementSuccess(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* incrementSaga(action: PayloadAction<CartItemType>) {
  try {
    if (action.payload.quantity < action.payload.inventory!) {
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

export function* cartSaga() {
  yield all([
    takeEvery(cartActions.decrement, decrementSaga),
    takeEvery(cartActions.increment, incrementSaga)
  ]);
}
