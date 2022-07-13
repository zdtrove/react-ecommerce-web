/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { CartState, ProductListCart } from 'types/cart';
import { Product } from 'types/product';
import { findIndex } from 'utils/functions';

const initialState: CartState = {
  open: false,
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart(state) {
      state.open = true;
    },
    closeCart(state) {
      state.open = false;
    },
    addToCart(state, action: PayloadAction<ProductListCart>) {},
    addToCartSuccess(state, action: PayloadAction<ProductListCart>) {
      const { product } = action.payload;
      const itemIndex = findIndex(state.cartItems, product);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity! += 1;
        state.cartItems[itemIndex].totalAmount! += state.cartItems[itemIndex].price;
      } else {
        const tempProduct = {
          ...product,
          quantity: 1,
          totalAmount: product.price
        };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity += 1;
    },
    increment(state, action: PayloadAction<Product>) {},
    incrementSuccess(state, action: PayloadAction<Product>) {
      const itemIndex = findIndex(state.cartItems, action.payload);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity! += 1;
        state.cartItems[itemIndex].totalAmount! += state.cartItems[itemIndex].price;
      }
      state.cartTotalQuantity += 1;
    },
    decrement(state, action: PayloadAction<ProductListCart>) {},
    decrementSuccess(state, action: PayloadAction<Product>) {
      const itemIndex = findIndex(state.cartItems, action.payload);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity! -= 1;
        state.cartItems[itemIndex].totalAmount! -= state.cartItems[itemIndex].price;
      }
      state.cartTotalQuantity -= 1;
    },
    remove(state, action: PayloadAction<ProductListCart>) {},
    removeSuccess(state, action: PayloadAction<ProductListCart>) {
      const { product } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== product._id);
      state.cartTotalQuantity -= product.quantity!;
    }
  }
});

export const cartActions = cartSlice.actions;

export const selectOpenCart = (state: AppState) => state.cart.open;
export const selectCartItems = (state: AppState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: AppState) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: AppState) => state.cart.cartTotalAmount;

const cartReducer = cartSlice.reducer;

export default cartReducer;
