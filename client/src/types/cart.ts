import { Product } from './product';

export type CartState = {
  open: boolean;
  cartItems: CartItems;
};

export type CartItems = {
  list: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

export type CartItem = Product & {
  quantity?: number;
  totalAmount?: number;
};

export type ProductListCart = {
  product: CartItem;
  products: Product[];
};
