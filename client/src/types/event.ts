export type Event = {
  _id?: string;
  name: string;
  enName: string;
  description: string;
  enDescription: string;
  startDate: Date;
  endDate: Date;
};

export type EventState = {
  events: Event[];
  loading: boolean;
};
