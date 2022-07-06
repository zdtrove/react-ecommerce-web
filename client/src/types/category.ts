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

export type CategoryOption = {
  level: number;
  name: string;
  id: string | undefined;
};
