import { User } from 'types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  isLogging?: boolean;
  user?: User | null;
}

const initialState: AuthState = {
  isLogging: false,
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    login(state, action: PayloadAction<any>) {
      state.isLogging = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLogging = false;
      state.user = action.payload;
    },
    loginFail(state) {
      state.isLogging = false;
    },
    logout(state) {
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
