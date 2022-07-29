/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { ProductListCart } from 'types/cart';
import { Product, ProductState } from 'types/product';

const initialState: ProductState = {
  products: [],
  loading: false,
  productsSearchBar: [],
  productsPhone: []
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
    getProductsAddOrRemoveCart(state, action: PayloadAction<ProductListCart>) {
      state.loading = true;
    },
    getProductsClearCart(state) {
      const products = state.products.map((product) => ({ ...product, inCart: false }));
      state.products = products;
    },
    getProductsFail(state) {
      state.loading = false;
    },
    getProductByCategoryId(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsPhone = products;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.loading = true;
    },
    addProductFail(state) {
      state.loading = false;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.loading = true;
    },
    updateProductFail(state) {
      state.loading = false;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteProductFail(state) {
      state.loading = false;
    },
    getProductsSearchBar(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getProductsSearchBarSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = true;
      state.productsSearchBar = action.payload;
    }
  }
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectProducts = (state: AppState) => state.product.products;
export const selectLoadingProduct = (state: AppState) => state.product.loading;
export const selectProductsSearchBar = (state: AppState) => state.product.productsSearchBar;
export const selectProductsPhone = (state: AppState) => state.product.productsPhone;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
