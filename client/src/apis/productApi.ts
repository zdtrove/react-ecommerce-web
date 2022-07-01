import { ENDPOINTS } from 'constants/index';
import { Product } from 'types/product';
import axios from 'utils/axios';
import { imageUpload } from 'utils/upload';

export const getProductsApi = async () => {
  try {
    return await axios.get(ENDPOINTS.products.getAll);
  } catch (err) {
    return err;
  }
};

export const addProductApi = async (product: Product) => {
  try {
    if (product.images) {
      const image = await imageUpload(product.images);
      product.images = image.url;
    }

    return await axios.post(ENDPOINTS.products.getAll, product);
  } catch (err) {
    return err;
  }
};
