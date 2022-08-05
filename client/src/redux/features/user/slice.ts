import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { User, UserState } from 'types/user';

const initialState: UserState = {
  users: [],
  loading: false,
  loadingAddWishlist: false,
  loadingRemoveWishlist: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state) {
      state.loading = true;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addUser(state, action: PayloadAction<User>) {
      state.loading = true;
    },
    addUserFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    updateUser(state, action: PayloadAction<User>) {
      state.loading = true;
    },
    updateUserFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    deleteUser(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteUserFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectUsers = (state: AppState) => state.user.users;
export const selectLoadingUser = (state: AppState) => state.user.loading;
export const selectLoadingAddWishlist = (state: AppState) => state.user.loadingAddWishlist;
export const selectLoadingRemoveWishlist = (state: AppState) => state.user.loadingRemoveWishlist;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
