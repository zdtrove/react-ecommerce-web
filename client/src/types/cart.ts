import { Product } from './product';

export type CartState = {
  open: boolean;
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

export type CartItem = Product & {
  quantity: number;
  totalAmount: number;
};
