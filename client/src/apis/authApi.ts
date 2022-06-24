import { ENDPOINTS } from 'constants/index';
import axios from 'utils/axios';

export const signUp = (dataSignUp: any) => async () => {
  try {
    return await axios.post(ENDPOINTS.auth.signUp, dataSignUp);
  } catch (err) {
    return err;
  }
};

export const login = async (dataLogin: any) => {
  try {
    return await axios.post(ENDPOINTS.auth.login, dataLogin);
  } catch (err) {
    return err;
  }
};
