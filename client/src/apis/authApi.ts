import { ENDPOINTS, jwtConst, userRoles } from 'constants/index';
import axios from 'utils/axios';
import jwtDecode from 'jwt-decode';
import { LoginPayload, SignUpPayload } from 'types/auth';

const { USER } = userRoles;
const { ACCESS_TOKEN } = jwtConst;

export const signUpApi = async (dataSignUp: SignUpPayload) => {
  try {
    return await axios.post(ENDPOINTS.auth.signUp, dataSignUp);
  } catch (err) {
    return err;
  }
};

export const loginApi = async (dataLogin: LoginPayload) => {
  try {
    return await axios.post(ENDPOINTS.auth.login, dataLogin);
  } catch (err) {
    return err;
  }
};

export const getLoggedUserApi = async () => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      return await axios.post(ENDPOINTS.auth.getLoggedUser, {
        accessToken
      });
    }
  } catch (err) {
    return err;
  }
};

export const refreshTokenApi = async () => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      const decoded: { role: number } = jwtDecode(accessToken.split(' ')[1]);
      return await axios.post(ENDPOINTS.auth.refreshToken, {
        accessToken,
        role: decoded.role
      });
    }
  } catch (err) {
    return err;
  }
};

export const logoutApi = async (role = USER) => {
  try {
    return await axios.post(ENDPOINTS.auth.logout, { role });
  } catch (err) {
    return err;
  }
};
