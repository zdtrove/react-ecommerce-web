export type Event = {
  _id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

export type EventState = {
  events: Event[];
  loading: boolean;
};

export type AddOrUpdateEventResponse = {
  status: number;
  event: Event;
};

export type DeleteEventResponse = {
  status: number;
};

export type GetAllEventsResponse = {
  data: {
    events: Event[];
  };
  status: number;
};
