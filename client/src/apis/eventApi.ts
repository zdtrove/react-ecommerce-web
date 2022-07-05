import axios from 'utils/axios';
import { ENDPOINTS } from 'constants/index';
import { Event } from 'types/event';

export const getEventsApi = async () => {
  try {
    return await axios.get(ENDPOINTS.events.getAll);
  } catch (err) {
    return err;
  }
};

export const addEventApi = async (event: Event) => {
  try {
    return await axios.post(ENDPOINTS.events.getAll, event);
  } catch (err) {
    return err;
  }
};

export const updateEventApi = async (event: Event) => {
  try {
    return await axios.patch(`${ENDPOINTS.events.getOne}/${event._id}`, event);
  } catch (err) {
    return err;
  }
};

export const deleteEventApi = async (id: string) => {
  try {
    return await axios.delete(`${ENDPOINTS.events.getOne}/${id}`);
  } catch (err) {
    return err;
  }
};
