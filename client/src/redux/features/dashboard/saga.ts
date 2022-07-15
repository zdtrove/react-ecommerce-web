import { getAllDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { Response } from 'types/common';
import { Dashboard } from 'types/dashboard';
import { dashboardActions } from './slice';

const { getDashboards, getDashboardsSuccess, getDashboardsFail } = dashboardActions;

function* getDashboardsSaga() {
  try {
    const res: Response<Dashboard> = yield call(getAllDataApi, ENDPOINTS.dashboards.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(getDashboardsSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(getDashboardsFail());
  }
}

export function* dashboardSaga() {
  yield all([takeEvery(getDashboards, getDashboardsSaga)]);
}
