export type CategoryState = {
  categories: Category[];
  loading: boolean;
};

export type Category = {
  _id?: string;
  name: string;
  slug?: string;
  parentId?: string;
  image: string | null;
  children?: Category[];
};

export type GetAllCategoryResponse = {
  data: {
    categories: Category[];
  };
  status: number;
};

export type UpdateCategoryResponse = {
  data: Category;
  status: number;
};

export type DeleteCategoryResponse = {
  message: string;
  status: number;
};
