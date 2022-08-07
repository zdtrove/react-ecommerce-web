/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { ProductListCart } from 'types/cart';
import { Product, ProductState } from 'types/product';

const initialState: ProductState = {
  products: [],
  product: {} as Product,
  loading: false,
  productsSearchBar: [],
  loadingProductsSearchBar: false,
  productsByCategoryId: [],
  productsByCategoryIds: [],
  productsRelated: []
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
    getProductsByCategoryId(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsByCategoryId = products;
    },
    getProductsByCategoryIds(state, action: PayloadAction<string[]>) {
      const products = state.products.filter((product) =>
        action.payload.includes(product.categoryId)
      );
      state.productsByCategoryIds = products;
    },
    getProductById(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product._id === action.payload);
      state.product = products[0];
    },
    getProductsRelated(state, action: PayloadAction<Product>) {
      const products = state.products.filter(
        (product) => product.categoryId === action.payload.categoryId
      );
      const productsExclude = products.filter((product) => product._id !== action.payload._id);
      state.productsRelated = productsExclude;
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
      state.loadingProductsSearchBar = true;
    },
    getProductsSearchBarSuccess(state, action: PayloadAction<Product[]>) {
      state.loadingProductsSearchBar = false;
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
export const selectProductsByCategoryId = (state: AppState) => state.product.productsByCategoryId;
export const selectProductsByCategoryIds = (state: AppState) => state.product.productsByCategoryIds;
export const selectProduct = (state: AppState) => state.product.product;
export const selectProductsRelated = (state: AppState) => state.product.productsRelated;
export const selectLoadingProductsSearchBar = (state: AppState) =>
  state.product.loadingProductsSearchBar;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
