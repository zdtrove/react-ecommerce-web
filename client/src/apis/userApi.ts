import axios from 'utils/axios';
import { ENDPOINTS } from 'constants/index';
import { User } from 'constants/types';

export const getUsersApi = async () => {
  try {
    return await axios.get(ENDPOINTS.users.getAll);
  } catch (err) {
    return err;
  }
};

export const addUserApi = async (user: User) => {
  try {
    return await axios.post(ENDPOINTS.users.getAll, user);
  } catch (err) {
    return err;
  }
};

export const updateUserApi = async (user: User) => {
  try {
    return await axios.patch(`${ENDPOINTS.users.getOne}/${user._id}`, user);
  } catch (err) {
    return err;
  }
};

export const deleteUserApi = async (id: string) => {
  try {
    return await axios.delete(`${ENDPOINTS.users.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
