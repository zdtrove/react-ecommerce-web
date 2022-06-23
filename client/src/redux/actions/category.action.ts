import { ENDPOINTS } from 'constants/index';
import { Dispatch } from 'redux';
import { categoryTypes } from 'redux/types';
import axios from 'utils/axios';
import { imageUpload } from 'utils/upload';

const { GET_CATEGORIES } = categoryTypes;

export const getCategories = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(ENDPOINTS.categories.getAll);
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: GET_CATEGORIES, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line no-unused-vars
export const addCategory = (category: any) => async (dispatch: Dispatch) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    const res = await axios.post(ENDPOINTS.categories.getAll, category);
    if (res.status === 201) {
      // dispatch(getCategories());
    }
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line no-unused-vars
export const updateCategory = (category: any) => async (dispatch: Dispatch) => {
  try {
    const image = await imageUpload(category.image);
    category.image = image.url;
    const res = await axios.patch(`${ENDPOINTS.categories.getOne}/${category.id}`, category);
    if (res.status === 200) {
      // dispatch(getCategories());
    }
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line no-unused-vars
export const deleteCategory = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`${ENDPOINTS.categories.getOne}/${id}`);
    if (res.status === 200) {
      // dispatch(getCategories());
    }
  } catch (err) {
    console.log(err);
  }
};
