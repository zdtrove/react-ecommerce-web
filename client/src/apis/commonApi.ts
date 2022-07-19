import { Data } from 'types/common';
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

export const updateDataApi = async (endpoint: string, user: Data) => {
  try {
    return await axios.patch(`${endpoint}/${user._id}`, user);
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
