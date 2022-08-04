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
  productsPhone: [],
  productsLaptop: [],
  productsTablet: [],
  productsWatch: [],
  productsRefrigerator: [],
  productsByCategoryId: [],
  productsByCategoryIds: [],
  productsAirConditioner: [],
  productsWashingMachine: [],
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
    getProductsPhone(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsPhone = products;
    },
    getProductsLaptop(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsLaptop = products;
    },
    getProductsTablet(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsTablet = products;
    },
    getProductsWatch(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsWatch = products;
    },
    getProductsRefrigerator(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsRefrigerator = products;
    },
    getProductsAirConditioner(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsAirConditioner = products;
    },
    getProductsWashingMachine(state, action: PayloadAction<string>) {
      const products = state.products.filter((product) => product.categoryId === action.payload);
      state.productsWashingMachine = products;
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
export const selectProductsLaptop = (state: AppState) => state.product.productsLaptop;
export const selectProductsTablet = (state: AppState) => state.product.productsTablet;
export const selectProductsWatch = (state: AppState) => state.product.productsWatch;
export const selectProductsRefrigerator = (state: AppState) => state.product.productsRefrigerator;
export const selectProductsAirConditioner = (state: AppState) =>
  state.product.productsAirConditioner;
export const selectProductsWashingMachine = (state: AppState) =>
  state.product.productsWashingMachine;
export const selectProductsByCategoryId = (state: AppState) => state.product.productsByCategoryId;
export const selectProductsByCategoryIds = (state: AppState) => state.product.productsByCategoryIds;
export const selectProduct = (state: AppState) => state.product.product;
export const selectProductsRelated = (state: AppState) => state.product.productsRelated;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
