import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import uiReducer from './ui.reducer';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer
});

export type AppState = ReturnType<typeof rootReducer>;
