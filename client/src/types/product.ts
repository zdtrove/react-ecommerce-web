export type Product = {
  _id?: string;
  name: string;
  description?: string;
  categoryId: string;
  price: number | string;
  images?: any[];
  sold?: number;
  star?: number;
};

export type ProductState = {
  products: Product[];
  loading: boolean;
};

export type GetAllProductResponse = {
  data: {
    products: Product[];
  };
  status: number;
};

export type UpdateProductResponse = {
  data: Product;
  status: number;
};
