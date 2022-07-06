export type Store = {
  _id?: string;
  name: string;
  address: string;
  region: string;
  openingHour?: string;
  closingHour?: string;
  map?: Map;
};

export type Map = {
  title?: string;
  lat?: number;
  lng?: number;
};

export type StoreState = {
  stores: Store[];
  loading: boolean;
};
