import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import type { Color } from '@material-ui/lab/Alert';

export interface UiState {
  snackbar: {
    isShow: boolean;
    message: string | null;
    status: Color;
  };
  backdrop: boolean;
}

const initialState: UiState = {
  snackbar: {
    isShow: false,
    message: null,
    status: 'warning'
  },
  backdrop: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<any>) {
      state.snackbar = {
        isShow: true,
        message: action.payload.message,
        status: action.payload.status
      };
    },
    hideSnackbar(state) {
      state.snackbar.isShow = false;
    },
    showBackdrop(state) {
      state.backdrop = true;
    },
    hideBackdrop(state) {
      state.backdrop = false;
    }
  }
});

// Actions
export const uiActions = uiSlice.actions;

// Selectors
export const selectSnackbar = (state: AppState) => state.ui.snackbar;
export const selectBackdrop = (state: AppState) => state.ui.backdrop;

// Reducer
const uiReducer = uiSlice.reducer;
export default uiReducer;
