import { PayloadAction } from '@reduxjs/toolkit';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { call, all, put, takeEvery, delay } from 'redux-saga/effects';
import { AddOrUpdateResponse, DeleteResponse, ListResponse } from 'types/common';
import { Event } from 'types/event';
import { uiActions } from '../ui/slice';
import { eventActions } from './slice';

const {
  addEvent,
  addEventSuccess,
  addEventFail,
  getEvents,
  getEventsSuccess,
  getEventsFail,
  updateEventFail,
  updateEventSuccess,
  updateEvent,
  deleteEvent,
  deleteEventSuccess,
  deleteEventFail
} = eventActions;

const { hideModal } = uiActions;

function* getEventsSaga() {
  try {
    const res: ListResponse<Event> = yield call(getAllDataApi, ENDPOINTS.events.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(getEventsSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(getEventsFail());
  }
}

function* addEventSaga(action: PayloadAction<Event>) {
  try {
    const res: AddOrUpdateResponse<Event> = yield call(
      addDataApi,
      ENDPOINTS.events.getAll,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(getEvents());
      yield delay(1000);
      yield put(addEventSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(addEventFail());
  }
}

function* updateEventSaga(action: PayloadAction<Event>) {
  try {
    const res: AddOrUpdateResponse<Event> = yield call(
      updateDataApi,
      ENDPOINTS.events.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(getEvents());
      yield delay(1000);
      yield put(updateEventSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(updateEventFail());
  }
}

function* deleteEventSaga(action: PayloadAction<string>) {
  try {
    const res: DeleteResponse<Event> = yield call(
      deleteDataApi,
      ENDPOINTS.events.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 200) {
      yield put(getEvents());
      yield delay(1000);
      yield put(deleteEventSuccess());
      yield put(hideModal());
    }
  } catch (error) {
    console.log(error);
    yield put(deleteEventFail());
  }
}

export function* eventSaga() {
  yield all([
    takeEvery(getEvents, getEventsSaga),
    takeEvery(addEvent, addEventSaga),
    takeEvery(updateEvent, updateEventSaga),
    takeEvery(deleteEvent, deleteEventSaga)
  ]);
}
