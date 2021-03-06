import type { Color } from '@material-ui/lab/Alert';
import { Category } from './category';
import { Event } from './event';
import { Product } from './product';
import { Store } from './store';
import { User } from './user';

export type Data = User | Product | Event | Store | Category;

export type cloudinaryImageType = {
  public_id: string;
  url: string;
};

export type decodedType = {
  role: string;
};

export type UiState = {
  snackbar: {
    isShow: boolean;
    message: string | null;
    status: Color;
  };
  backdrop: boolean;
};

export type AddOrUpdateResponse<T> = {
  status: number;
  data: T;
};

export type ListResponse<T> = {
  status: number;
  data: T[];
};

export type Response<T> = {
  status: number;
  data: T;
};

export type DeleteResponse<T> = {
  status: number;
  data: {
    message: string;
    data: T;
  };
};
