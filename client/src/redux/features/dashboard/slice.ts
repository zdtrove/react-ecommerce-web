import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Dashboard, DashboardState } from 'types/dashboard';

const initialState: DashboardState = {
  dashboards: [],
  loading: false
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboards(state) {
      state.loading = true;
    },
    getDashboardsSuccess(state, action: PayloadAction<Dashboard[]>) {
      state.loading = false;
      state.dashboards = action.payload;
    },
    getDashboardsFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectDashboards = (state: AppState) => state.dashboard.dashboards;
export const selectLoadingDashboard = (state: AppState) => state.dashboard.loading;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
