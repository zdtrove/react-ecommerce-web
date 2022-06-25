import { ENDPOINTS } from 'constants/index';
import axios from 'utils/axios';
import { categoryTypes } from 'redux/types';
import { imageUpload } from 'utils/upload';

const { GET_CATEGORIES } = categoryTypes;

export const getCategoriesApi = async () => {
  try {
    return await axios.get(ENDPOINTS.categories.getAll);
  } catch (err) {
    return err;
  }
};

export const addCategoryApi = async (category: any) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    return await axios.post(ENDPOINTS.categories.getAll, category);
  } catch (err) {
    return err;
  }
};

export const updateCategoryApi = async (category: any) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    return await axios.patch(`${ENDPOINTS.categories.getOne}/${category.id}`, category);
  } catch (err) {
    return err;
  }
};

export const deleteCategoryApi = async (id: number) => {
  try {
    return await axios.delete(`${ENDPOINTS.categories.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
