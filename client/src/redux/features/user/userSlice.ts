import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/user';

export interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state) {
      state.loading = true;
    },
    getUsersSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.users = action.payload.users;
    },
    getUsersFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectUsers = (state: any) => state.user.users;
export const selectLoadingUser = (state: any) => state.user.loading;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
