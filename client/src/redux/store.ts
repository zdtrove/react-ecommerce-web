import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from './features/auth/slice';
import categoryReducer from './features/category/slice';
import userReducer from './features/user/slice';
import uiReducer from './features/ui/slice';
import productReducer from './features/product/slice';
import eventReducer from './features/event/slice';
import storeReducer from './features/store/slice';
import cartReducer from './features/cart/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  event: eventReducer,
  store: storeReducer,
  user: userReducer,
  ui: uiReducer,
  cart: cartReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
