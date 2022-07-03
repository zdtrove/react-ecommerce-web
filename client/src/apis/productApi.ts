import { ENDPOINTS } from 'constants/index';
import { Product } from 'types/product';
import axios from 'utils/axios';
import { imagesUpload } from 'utils/upload';

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
      const images = await imagesUpload(product.images);
      product.images = images;
    }
    console.log('product', product);

    return await axios.post(ENDPOINTS.products.getAll, product);
  } catch (err) {
    return err;
  }
};

export const updateProductApi = async (product: Product) => {
  try {
    let imagesNew: any[] = [];
    let imagesOld: any[] = product.imagesOld || [];
    if (product.imagesNew) {
      imagesNew = await imagesUpload(product.imagesNew);
    }
    product.images = [...imagesOld, ...imagesNew];

    return await axios.patch(`${ENDPOINTS.products.getOne}/${product._id}`, product);
  } catch (err) {
    return err;
  }
};

export const deleteProductApi = async (id: string) => {
  try {
    return await axios.delete(`${ENDPOINTS.products.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
