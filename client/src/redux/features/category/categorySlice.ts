import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryState {
  categories: any[];
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories(state) {
      state.isLoading = true;
    },
    getCategoriesSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.categories = action.payload;
    }
  }
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategories = (state: any) => state.category.categories;
export const selectIsLoading = (state: any) => state.category.isLoading;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
