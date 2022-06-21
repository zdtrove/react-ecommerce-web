import { ENDPOINTS } from 'constants';
import { categoryTypes } from 'redux/types';
import axios from 'utils/axios';
import { imageUpload } from 'utils/upload';

const { GET_CATEGORIES } = categoryTypes;

export const getCategories = (role) => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINTS.categories.getAll, { role });
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: GET_CATEGORIES, payload: data });
    }
  } catch (err) {}
};

export const addCategory = (category) => async (dispatch) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    const res = await axios.post(ENDPOINTS.categories.getAll, category);
    if (res.status === 201) {
      dispatch(getCategories());
    }
  } catch (err) {}
};

export const updateCategory = (category) => async (dispatch) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    const res = await axios.patch(`${ENDPOINTS.categories.getOne}/${category.id}`, category);
    if (res.status === 200) {
      dispatch(getCategories());
    }
  } catch (err) {}
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${ENDPOINTS.categories.getOne}/${id}`);
    if (res.status === 200) {
      dispatch(getCategories());
    }
  } catch (err) {}
};
