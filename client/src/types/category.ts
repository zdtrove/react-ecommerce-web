export type CategoryState = {
  categories: Category[];
  loading: boolean;
  categoriesPhone: Category;
  categoriesLaptop: Category;
  categoriesTablet: Category;
  categoriesWatch: Category;
  categoriesRefrigerator: Category;
  categoriesAirConditioner?: Category;
  categoriesWashingMachine?: Category;
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
