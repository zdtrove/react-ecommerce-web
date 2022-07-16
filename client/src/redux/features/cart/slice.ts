/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { CartItem, CartItems, CartState, ProductListCart } from 'types/cart';
import { Product } from 'types/product';
import { findIndex } from 'utils/functions';

const defaultCarts: CartItems = { list: [], cartTotalQuantity: 0, cartTotalAmount: 0 };

const initialState: CartState = {
  open: false,
  cartItems: JSON.parse(localStorage.getItem('cartItems') || JSON.stringify(defaultCarts))
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
    addToCartSuccess(state, action: PayloadAction<Product>) {
      const { cartItems } = state;
      const index = findIndex(cartItems.list, action.payload);
      if (index >= 0) {
        cartItems.list[index].quantity! += 1;
        cartItems.list[index].totalAmount! += cartItems.list[index].price;
      } else {
        const tempProduct = {
          ...action.payload,
          quantity: 1,
          totalAmount: action.payload.price
        };
        cartItems.list.push(tempProduct);
      }
      cartItems.cartTotalQuantity += 1;
      cartItems.cartTotalAmount += action.payload.price;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    increment(state, action: PayloadAction<Product>) {},
    incrementSuccess(state, action: PayloadAction<Product>) {
      const { cartItems } = state;
      const index = findIndex(cartItems.list, action.payload);
      if (index >= 0) {
        cartItems.list[index].quantity! += 1;
        cartItems.list[index].totalAmount! += cartItems.list[index].price;
      }
      cartItems.cartTotalQuantity += 1;
      cartItems.cartTotalAmount += cartItems.list[index].price;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    decrement(state, action: PayloadAction<ProductListCart>) {},
    decrementSuccess(state, action: PayloadAction<Product>) {
      const { cartItems } = state;
      const index = findIndex(cartItems.list, action.payload);
      if (index >= 0) {
        cartItems.list[index].quantity! -= 1;
        cartItems.list[index].totalAmount! -= cartItems.list[index].price;
      }
      cartItems.cartTotalQuantity -= 1;
      cartItems.cartTotalAmount -= cartItems.list[index].price;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    remove(state, action: PayloadAction<ProductListCart>) {},
    removeSuccess(state, action: PayloadAction<CartItem>) {
      const { _id, quantity, price } = action.payload;
      const { cartItems } = state;
      cartItems.list = cartItems.list.filter((item) => item._id !== _id);
      cartItems.cartTotalQuantity -= quantity!;
      cartItems.cartTotalAmount -= quantity! * price;
      cartItems.list.length
        ? localStorage.setItem('cartItems', JSON.stringify(cartItems))
        : localStorage.removeItem('cartItems');
    },
    clear(state) {},
    clearSuccess(state) {
      state.cartItems = defaultCarts;
      localStorage.removeItem('cartItems');
    }
  }
});

export const cartActions = cartSlice.actions;

export const selectOpenCart = (state: AppState) => state.cart.open;
export const selectCartItems = (state: AppState) => state.cart.cartItems.list;
export const selectCartTotalQuantity = (state: AppState) => state.cart.cartItems.cartTotalQuantity;
export const selectCartTotalAmount = (state: AppState) => state.cart.cartItems.cartTotalAmount;

const cartReducer = cartSlice.reducer;

export default cartReducer;
