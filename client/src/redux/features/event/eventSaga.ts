import { PayloadAction } from '@reduxjs/toolkit';
import { addDataApi, deleteDataApi, getAllDataApi, updateDataApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AddOrUpdateResponse, DeleteResponse, ListResponse } from 'types/common';
import { Event } from 'types/event';
import { eventActions } from './eventSlice';

function* getEventsSaga() {
  try {
    const res: ListResponse<Event> = yield call(getAllDataApi, ENDPOINTS.events.getAll);
    const { status, data } = res;
    if (status === 200) {
      yield put(eventActions.getEventsSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(eventActions.getEventsFail());
  }
}

function* addEventSaga(action: PayloadAction<Event>) {
  try {
    const res: AddOrUpdateResponse<Event> = yield call(
      addDataApi,
      ENDPOINTS.events.getOne,
      action.payload
    );
    const { status } = res;
    if (status === 201) {
      yield put(eventActions.getEvents());
    }
  } catch (error) {
    console.log(error);
    yield put(eventActions.addEventFail());
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
      yield put(eventActions.getEvents());
    }
  } catch (error) {
    console.log(error);
    yield put(eventActions.updateEventFail());
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
      yield put(eventActions.getEvents());
    }
  } catch (error) {
    console.log(error);
    yield put(eventActions.deleteEventFail());
  }
}

export function* eventSaga() {
  yield all([
    takeEvery(eventActions.getEvents, getEventsSaga),
    takeEvery(eventActions.addEvent, addEventSaga),
    takeEvery(eventActions.updateEvent, updateEventSaga),
    takeEvery(eventActions.deleteEvent, deleteEventSaga)
  ]);
}
