import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from './features/auth/authSlice';
import categoryReducer from './features/category/categorySlice';
import userReducer from './features/user/userSlice';
import uiReducer from './features/ui/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  ui: uiReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
