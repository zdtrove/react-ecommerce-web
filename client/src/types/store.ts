export type Store = {
  _id?: string;
  name: string;
  address: string;
  region: string;
};

export type StoreState = {
  stores: Store[];
  loading: boolean;
};

export type AddOrUpdateStoreResponse = {
  status: number;
  store: Store;
};

export type DeleteStoreResponse = {
  status: number;
};

export type GetAllStoresResponse = {
  data: {
    stores: Store[];
  };
  status: number;
};
