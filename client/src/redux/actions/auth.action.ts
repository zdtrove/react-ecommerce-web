import { authTypes } from 'redux/types';
import { userRoles, jwtConst, ROUTES, ENDPOINTS } from 'constants/index';
import axios from 'utils/axios';
import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';

const { AUTH, LOGOUT_SUCCESS, REFRESH_TOKEN } = authTypes;
const { USER } = userRoles;
const { ACCESS_TOKEN } = jwtConst;

export const register = (data: any) => async () => {
  try {
    const res = await axios.post(ENDPOINTS.auth.register, data);
    const { status } = res;
    if (status === 201) {
      console.log(status);
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = (dataLogin: any) => async (dispatch: Dispatch) => {
  console.log(dataLogin);
  try {
    const res = await axios.post(ENDPOINTS.auth.login, dataLogin);
    console.log(res);
    const { status, data } = res;
    if (status === 200) {
      dispatch({ type: AUTH, payload: data });
      localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLoggedUser = () => async (dispatch: Dispatch) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      const res = await axios.post(ENDPOINTS.auth.getLoggedUser, {
        accessToken
      });
      const { status, data } = res;
      if (status === 200) {
        dispatch({ type: AUTH, payload: data });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      const decoded: { role: number } = jwtDecode(accessToken.split(' ')[1]);
      const res = await axios.post(ENDPOINTS.auth.refreshToken, {
        accessToken,
        role: decoded.role
      });
      const { status, data } = res;
      if (status === 200) {
        dispatch({ type: REFRESH_TOKEN, payload: data });
        localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout =
  (history: any, role = USER) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(ENDPOINTS.auth.logout, { role });
      const { status } = res;
      if (status === 200) {
        if (role === USER) {
          dispatch({ type: LOGOUT_SUCCESS });
          localStorage.removeItem(ACCESS_TOKEN);
          history.push(ROUTES.home.login);
        } else {
          dispatch({ type: LOGOUT_SUCCESS });
          localStorage.removeItem(ACCESS_TOKEN);
          history.push(ROUTES.admin.login);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
