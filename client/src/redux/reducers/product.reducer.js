import { productTypes } from 'redux/types';

const { GET_PRODUCTS } = productTypes;

const initialState = {
  products: []
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: payload.products
      };
    }
    default:
      return state;
  }
};

export default productReducer;
