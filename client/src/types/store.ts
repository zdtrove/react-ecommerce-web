export type Store = {
  _id?: string;
  name: string;
  enName: string;
  address: string;
  enAddress: string;
  region: string;
  enRegion: string;
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
