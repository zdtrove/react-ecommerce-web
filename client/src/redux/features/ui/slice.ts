import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Snackbar, UiState } from 'types/common';

const initialState: UiState = {
  snackbar: {
    isShow: false,
    message: null,
    status: 'warning'
  },
  backdrop: false,
  modal: false,
  lightBox: false,
  lightBoxImage: '',
  lightBoxImageList: []
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<Snackbar>) {
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
    },
    showModal(state) {
      state.modal = true;
    },
    hideModal(state) {
      state.modal = false;
    },
    showLightBox(state) {
      state.lightBox = true;
    },
    hideLightBox(state) {
      state.lightBox = false;
    },
    setLightBoxImage(state, action: PayloadAction<string>) {
      state.lightBoxImage = action.payload;
    },
    setLightBoxImageList(state, action: PayloadAction<any[] | undefined>) {
      state.lightBoxImageList = action.payload;
    }
  }
});

// Actions
export const uiActions = uiSlice.actions;

// Selectors
export const selectSnackbar = (state: AppState) => state.ui.snackbar;
export const selectBackdrop = (state: AppState) => state.ui.backdrop;
export const selectModal = (state: AppState) => state.ui.modal;
export const selectLightBox = (state: AppState) => state.ui.lightBox;
export const selectLightBoxImage = (state: AppState) => state.ui.lightBoxImage;
export const selectLightBoxImageList = (state: AppState) => state.ui.lightBoxImageList;

// Reducer
const uiReducer = uiSlice.reducer;
export default uiReducer;
