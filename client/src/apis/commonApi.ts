import { Data } from 'types/common';
import { User } from 'types/user';
import axios from 'utils/axios';

export const addDataApi = async (endpoint: string, data: Data) => {
  try {
    return await axios.post(endpoint, data);
  } catch (err) {
    return err;
  }
};

export const getAllDataApi = async (endpoint: string, search: string = '') => {
  try {
    return await axios.get(`${endpoint}?name[regex]=${search}`);
  } catch (err) {
    return err;
  }
};

export const updateDataApi = async (endpoint: string, data: Data) => {
  try {
    return await axios.patch(`${endpoint}/${data._id}`, data);
  } catch (err) {
    return err;
  }
};

export const deleteDataApi = async (endpoint: string, id: string) => {
  try {
    return await axios.delete(`${endpoint}/${id}`);
  } catch (err) {
    return err;
  }
};

export const addWishlistApi = async (endpoint: string, data: { productId: string; user: User }) => {
  try {
    return await axios.patch(`${endpoint}/${data.user._id}/add-wishlist`, data);
  } catch (err) {
    return err;
  }
};

export const removeWishlistApi = async (
  endpoint: string,
  data: { productId: string; user: User }
) => {
  try {
    return await axios.patch(`${endpoint}/${data.user._id}/remove-wishlist`, data);
  } catch (err) {
    return err;
  }
};

export const ratingProductApi = async (
  endpoint: string,
  data: { productId: string; starNumber: number; userId: string; message: string }
) => {
  console.log('data', data);
  try {
    return await axios.patch(`${endpoint}/${data.productId}/rating`, data);
  } catch (err) {
    return err;
  }
};
