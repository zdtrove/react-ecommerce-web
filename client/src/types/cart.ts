import { Product } from './product';

export type CartState = {
  open: boolean;
  cartItems: CartItemType[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

export type CartItemType = Product & {
  quantity: number;
  totalAmount: number;
};
