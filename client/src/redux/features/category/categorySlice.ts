import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryState {
  categories: any[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories(state) {
      state.loading = true;
    },
    getCategoriesSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.categories = action.payload.categories;
    },
    // eslint-disable-next-line no-unused-vars
    updateCategory(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    updateCategorySuccess(state) {
      state.loading = false;
    }
  }
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategories = (state: any) => state.category.categories;
export const selectLoadingCategory = (state: any) => state.category.loading;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
