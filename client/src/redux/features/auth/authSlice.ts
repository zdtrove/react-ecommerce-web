import { User } from 'types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn?: boolean;
  isLogin?: boolean;
  user?: User | null;
  isSignUp?: boolean;
  isGetLoggedUser?: boolean;
  isRefreshToken?: boolean;
  isLogout?: boolean;
}

const initialState: AuthState = {
  isLogin: false,
  isLoggedIn: false,
  user: null,
  isSignUp: false,
  isGetLoggedUser: false,
  isRefreshToken: false,
  isLogout: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    login(state, action: PayloadAction<any>) {
      state.isLogin = true;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.isLogin = false;
      state.user = action.payload;
    },
    loginFail(state) {
      state.isLogin = false;
    },
    getLoggedUser(state) {
      state.isGetLoggedUser = true;
    },
    getLoggedUserSuccess(state, action: PayloadAction<any>) {
      state.isGetLoggedUser = false;
      state.user = action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    signUp(state, action: PayloadAction<any>) {
      state.isSignUp = true;
    },
    signUpSuccess(state) {
      state.isSignUp = false;
    },
    signUpFail(state) {
      state.isSignUp = false;
    },
    refreshToken(state) {
      state.isRefreshToken = true;
    },
    refreshTokenSuccess(state, action: PayloadAction<any>) {
      state.isRefreshToken = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogout = true;
    },
    logoutSuccess(state) {
      state.isLogout = false;
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
