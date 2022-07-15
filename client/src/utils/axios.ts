import axiosPackage from 'axios';
import { store } from 'redux/store';
import { snackbar, userRoles, jwtConst, uploadConst } from 'constants/index';
import { authActions } from 'redux/features/auth/slice';
import { ROUTES } from '../constants';
import { uiActions } from 'redux/features/ui/slice';

const { SNACKBAR_STATUS_SUCCESS } = snackbar;
const { ADMIN } = userRoles;
const { JWT_EXPIRED, JWT_INVALID, ACCESS_TOKEN } = jwtConst;
const { CLOUDINARY_URL } = uploadConst;
const { showBackdrop, showSnackbar, hideBackdrop } = uiActions;
const { logoutSuccess, refreshToken, clearToken } = authActions;

const axios = axiosPackage.create({});

axios.interceptors.request.use(
  function (config) {
    if (config.url !== CLOUDINARY_URL) {
      Object.assign(config.headers, {
        Authorization: localStorage.getItem(ACCESS_TOKEN)
      });
    }
    store.dispatch({ type: showBackdrop.type });

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const { message } = response.data;
    if (message) {
      if (response.status === 200 || response.status === 201) {
        store.dispatch({
          type: showSnackbar.type,
          payload: {
            message: response.data.message,
            status: SNACKBAR_STATUS_SUCCESS
          }
        });
      }
    }
    store.dispatch({ type: hideBackdrop.type });

    return response;
  },
  async function (error) {
    const { data, config } = error.response;
    console.log(error.response);
    if (data.name === JWT_INVALID) {
      store.dispatch({ type: logoutSuccess.type });
      localStorage.removeItem(ACCESS_TOKEN);
      if (data.role) {
        window.location.href = data.role === ADMIN ? ROUTES.admin.login : ROUTES.home.login;
      } else {
        window.location.href = ROUTES.home.login;
      }
    }

    if (data.name === JWT_EXPIRED) {
      store.dispatch({ type: refreshToken.type });
      config._retry = true;
      config.headers['Authorization'] = localStorage.getItem(ACCESS_TOKEN);

      return axiosPackage(config);
    }
    if (data.name !== JWT_INVALID) {
      console.log('error.response', error.response);
      store.dispatch({ type: clearToken.type });
      window.location.href = ROUTES.home.login;
    }
    store.dispatch({ type: hideBackdrop });

    return Promise.reject(error);
  }
);

export default axios;
