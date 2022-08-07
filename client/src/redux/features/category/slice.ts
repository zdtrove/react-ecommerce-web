import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Category, CategoryState } from 'types/category';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  categoriesById: {} as Category
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories(state) {
      state.loading = true;
    },
    getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    getCategoriesFail(state) {
      state.loading = false;
    },
    getCategoriesById(state, action: PayloadAction<string>) {
      const categories = state.categories.filter((category) => category._id === action.payload);
      state.categoriesById = categories[0];
    },
    // eslint-disable-next-line no-unused-vars
    updateCategory(state, action: PayloadAction<Category>) {
      state.loading = true;
    },
    updateCategoryFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addCategory(state, action: PayloadAction<Category>) {
      state.loading = true;
    },
    addCategoryFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    deleteCategory(state, action: PayloadAction<string>) {
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
export const selectCategoriesById = (state: AppState) => state.category.categoriesById;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
