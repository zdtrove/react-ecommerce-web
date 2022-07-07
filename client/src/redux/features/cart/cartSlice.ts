import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { CartState } from 'types/cart';
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
    addToCart(state, action: PayloadAction<Product>) {
      const itemIndex = findIndex(state.cartItems, action.payload);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        state.cartItems[itemIndex].totalAmount += state.cartItems[itemIndex].price;
      } else {
        const tempProduct = {
          ...action.payload,
          quantity: 1,
          totalAmount: action.payload.price
        };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity += 1;
    },
    increment(state, action: PayloadAction<Product>) {
      const itemIndex = findIndex(state.cartItems, action.payload);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        state.cartItems[itemIndex].totalAmount += state.cartItems[itemIndex].price;
      }
    },
    decrement(state, action: PayloadAction<Product>) {
      const itemIndex = findIndex(state.cartItems, action.payload);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity -= 1;
        state.cartItems[itemIndex].totalAmount -= state.cartItems[itemIndex].price;
      }
    },
    remove(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
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
