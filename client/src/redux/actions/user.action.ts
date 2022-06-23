import axios from 'utils/axios';
import { userTypes } from 'redux/types';
import { ENDPOINTS } from 'constants/index';
import { Dispatch } from 'redux';
import { User } from 'constants/types';

const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = userTypes;

export const getUsers = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(ENDPOINTS.users.getAll);
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: GET_USERS, payload: data });
      return data.users;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addUser = (user: User) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(ENDPOINTS.users.getAll, user);
    const { status, data } = res;
    if (status === 201) {
      dispatch({ type: ADD_USER, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (user: User) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.patch(`${ENDPOINTS.users.getOne}/${user._id}`, user);
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: UPDATE_USER, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`${ENDPOINTS.users.getOne}/${id}`);
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: DELETE_USER, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};
