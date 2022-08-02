import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HOME_CATEGORY_IDS } from 'constants/index';
import { AppState } from 'redux/store';
import { Category, CategoryState } from 'types/category';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  categoriesPhone: {} as Category,
  categoriesLaptop: {} as Category,
  categoriesTablet: {} as Category,
  categoriesWatch: {} as Category,
  categoriesRefrigerator: {} as Category,
  categoriesById: {} as Category,
  categoriesAirConditioner: {} as Category,
  categoriesWashingMachine: {} as Category
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
    getCategoriesPhone(state) {
      const categories = state.categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.smartphone);
      state.categoriesPhone = categories[0];
    },
    getCategoriesLaptop(state) {
      const categories = state.categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.laptop);
      state.categoriesLaptop = categories[0];
    },
    getCategoriesTablet(state) {
      const categories = state.categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.tablet);
      state.categoriesTablet = categories[0];
    },
    getCategoriesWatch(state) {
      const categories = state.categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.watch);
      state.categoriesWatch = categories[0];
    },
    getCategoriesRefrigerator(state) {
      const categories = state.categories.filter(
        (cat) => cat._id === HOME_CATEGORY_IDS.refrigerator
      );
      state.categoriesRefrigerator = categories[0];
    },
    getCategoriesAirConditioner(state) {
      const categories = state.categories.filter(
        (cat) => cat._id === HOME_CATEGORY_IDS.airConditioner
      );
      state.categoriesAirConditioner = categories[0];
    },
    getCategoriesWashingMachine(state) {
      const categories = state.categories.filter(
        (cat) => cat._id === HOME_CATEGORY_IDS.washingMachine
      );
      state.categoriesWashingMachine = categories[0];
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
export const selectCategoriesPhone = (state: AppState) => state.category.categoriesPhone;
export const selectCategoriesLaptop = (state: AppState) => state.category.categoriesLaptop;
export const selectCategoriesTablet = (state: AppState) => state.category.categoriesTablet;
export const selectCategoriesWatch = (state: AppState) => state.category.categoriesWatch;
export const selectCategoriesRefrigerator = (state: AppState) =>
  state.category.categoriesRefrigerator;
export const selectCategoriesAirConditioner = (state: AppState) =>
  state.category.categoriesAirConditioner;
export const selectCategoriesWashingMachine = (state: AppState) =>
  state.category.categoriesWashingMachine;
export const selectCategoriesById = (state: AppState) => state.category.categoriesById;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
