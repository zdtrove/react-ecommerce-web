import axios from 'utils/axios';
import { ENDPOINTS } from 'constants/index';
import { Store } from 'types/store';

export const getStoresApi = async () => {
  try {
    return await axios.get(ENDPOINTS.stores.getAll);
  } catch (err) {
    return err;
  }
};

export const addStoreApi = async (store: Store) => {
  try {
    return await axios.post(ENDPOINTS.stores.getAll, store);
  } catch (err) {
    return err;
  }
};

export const updateStoreApi = async (store: Store) => {
  try {
    return await axios.patch(`${ENDPOINTS.stores.getOne}/${store._id}`, store);
  } catch (err) {
    return err;
  }
};

export const deleteStoreApi = async (id: string) => {
  try {
    return await axios.delete(`${ENDPOINTS.stores.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
