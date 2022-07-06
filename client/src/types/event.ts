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
