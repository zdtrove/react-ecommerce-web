import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Category } from 'types/category';

export interface CategoryState {
  categories: Category[];
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
    getCategoriesFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    updateCategory(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    updateCategoryFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addCategory(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    addCategoryFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    deleteCategory(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    deleteCategoryFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategories = (state: AppState) => state.category.categories;
export const selectLoadingCategory = (state: AppState) => state.category.loading;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
