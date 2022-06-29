import { ENDPOINTS } from 'constants/index';
import { Category } from 'types/category';
import axios from 'utils/axios';
import { imageUpload } from 'utils/upload';

export const getCategoriesApi = async () => {
  try {
    return await axios.get(ENDPOINTS.categories.getAll);
  } catch (err) {
    return err;
  }
};

export const addCategoryApi = async (category: Category) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    return await axios.post(ENDPOINTS.categories.getAll, category);
  } catch (err) {
    return err;
  }
};

export const updateCategoryApi = async (category: Category) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    return await axios.patch(`${ENDPOINTS.categories.getOne}/${category._id}`, category);
  } catch (err) {
    return err;
  }
};

export const deleteCategoryApi = async (id: string) => {
  try {
    return await axios.delete(`${ENDPOINTS.categories.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
