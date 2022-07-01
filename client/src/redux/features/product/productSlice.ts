import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Product, ProductState } from 'types/product';

const initialState: ProductState = {
  products: [],
  loading: false
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts(state) {
      state.loading = true;
    },
    getProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addProduct(state, action: PayloadAction<Product>) {
      state.loading = true;
    },
    addProductFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectProducts = (state: AppState) => state.product.products;
export const selectLoadingProduct = (state: AppState) => state.product.loading;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
