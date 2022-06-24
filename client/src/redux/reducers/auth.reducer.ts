import { authTypes } from 'redux/types';

const { AUTH, LOGOUT_SUCCESS, REFRESH_TOKEN } = authTypes;

const initialState = {
  isLoggedIn: false,
  user: null
};

const authReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case AUTH:
    case REFRESH_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
