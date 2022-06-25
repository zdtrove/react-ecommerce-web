import { User } from 'types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn?: boolean;
  loading?: boolean;
  user?: User | null;
}

const initialState: AuthState = {
  loading: false,
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    login(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFail(state) {
      state.loading = false;
    },
    getLoggedUser(state) {
      state.loading = true;
    },
    getLoggedUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    signUp(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    signUpSuccess(state) {
      state.loading = false;
    },
    signUpFail(state) {
      state.loading = false;
    },
    refreshToken(state) {
      state.loading = true;
    },
    refreshTokenSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoadingAuth = (state: any) => state.auth.loading;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
