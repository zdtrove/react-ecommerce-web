import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { Event, EventState } from 'types/event';

const initialState: EventState = {
  events: [],
  loading: false
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEvents(state) {
      state.loading = true;
    },
    getEventsSuccess(state, action: PayloadAction<Event[]>) {
      state.loading = false;
      state.events = action.payload;
    },
    getEventsFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    addEvent(state, action: PayloadAction<Event>) {
      state.loading = true;
    },
    addEventFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    updateEvent(state, action: PayloadAction<Event>) {
      state.loading = true;
    },
    updateEventFail(state) {
      state.loading = false;
    },
    // eslint-disable-next-line no-unused-vars
    deleteEvent(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteEventFail(state) {
      state.loading = false;
    }
  }
});

// Actions
export const eventActions = eventSlice.actions;

// Selectors
export const selectEvents = (state: AppState) => state.event.events;
export const selectLoadingEvent = (state: AppState) => state.event.loading;

// Reducer
const eventReducer = eventSlice.reducer;
export default eventReducer;
