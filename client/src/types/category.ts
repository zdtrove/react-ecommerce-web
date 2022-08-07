export type CategoryState = {
  categories: Category[];
  loading: boolean;
  categoriesById: Category;
};

export type Category = {
  _id?: string;
  name: string;
  enName: string;
  icon?: string;
  isMenu?: string;
  slug?: string;
  parentId?: string;
  image: string | null;
  children: Category[];
};

export type CategoryOption = {
  level: number;
  name: string;
  id: string | undefined;
};
