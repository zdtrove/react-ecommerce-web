import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Store, StoreState } from 'types/store';

const initialState: StoreState = {
  stores: [],
  loading: false
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStores(state) {
      state.loading = true;
    },
    getStoresSuccess(state, action: PayloadAction<Store[]>) {
      state.loading = false;
      state.stores = action.payload;
    },
    getStoresFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addStore(state, action: PayloadAction<Store>) {
      state.loading = true;
    },
    addStoreFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    updateStore(state, action: PayloadAction<Store>) {
      state.loading = true;
    },
    updateStoreFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    deleteStore(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteStoreFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const storeActions = storeSlice.actions;

// Selectors
export const selectStores = (state: AppState) => state.store.stores;
export const selectLoadingStore = (state: AppState) => state.store.loading;

// Reducer
const storeReducer = storeSlice.reducer;
export default storeReducer;
