import { PayloadAction } from '@reduxjs/toolkit';
import { getEventsApi, addEventApi, updateEventApi, deleteEventApi } from 'apis/eventApi';
import { call, all, put, takeEvery } from 'redux-saga/effects';
import {
  AddOrUpdateEventResponse,
  DeleteEventResponse,
  GetAllEventsResponse,
  Event
} from 'types/event';
import { eventActions } from './eventSlice';

function* getEventsSaga() {
  try {
    const res: GetAllEventsResponse = yield call(getEventsApi);
    const { status, data } = res;
    if (status === 200) {
      yield put(eventActions.getEventsSuccess(data.events));
    }
  } catch (error) {
    console.log(error);
    yield put(eventActions.getEventsFail());
  }
}

function* addEventSaga(action: PayloadAction<Event>) {
  try {
    const res: AddOrUpdateEventResponse = yield call(addEventApi, action.payload);
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
    const res: AddOrUpdateEventResponse = yield call(updateEventApi, action.payload);
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
    const res: DeleteEventResponse = yield call(deleteEventApi, action.payload);
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
