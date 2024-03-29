export type Product = {
  _id?: string;
  name: string;
  enName: string;
  description?: string;
  enDescription?: string;
  shortDescription?: string;
  enShortDescription?: string;
  gift?: Gift;
  categoryId: string;
  price: number;
  salePrice?: number;
  inventory?: number;
  isSale?: boolean;
  new?: boolean;
  slug?: string;
  releaseDate?: Date;
  manufacture?: string;
  eventIds?: string[];
  storeIds?: string[];
  installment?: boolean;
  images?: any[];
  imagesOld?: any[];
  imagesNew?: any[];
  sold: number;
  star: Star;
  configuration?: Configuration;
  inCart?: boolean;
};

export type Configuration = {
  screen?: string;
  os?: string;
  camera?: Camera;
  cpu?: string;
  ram?: string;
  memory?: string;
  sim?: string;
  battery?: string;
  resolution?: string;
  dimensions?: string;
  gps?: string;
  bluetooth?: string;
  wifi?: string;
  hardDrive?: string;
  graphic?: string;
  connector?: string;
  type?: string;
  capacity?: string;
  energySavingTechnology?: string;
};

export type Camera = {
  rear?: string;
  front?: string;
};

export type Gift = {
  text?: string;
  enText?: string;
  price?: number;
};

export type Star = {
  average: number;
  list: ListRated[];
};

export type ListRated = {
  userId: string;
  star: number;
  message: string;
  userName: string;
  date: Date;
  images?: any[];
  imagesOld?: any[];
  imagesNew?: any[];
};

export type ProductState = {
  products: Product[];
  loading: boolean;
  loadingRating: boolean;
  productsSearchBar: Product[];
  loadingProductsSearchBar: boolean;
};

export type StarPercent = {
  value: number;
  percent: number;
};

export type StarByNumber = {
  one: StarPercent;
  two: StarPercent;
  three: StarPercent;
  four: StarPercent;
  five: StarPercent;
};
