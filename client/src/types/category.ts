export type Category = {
  _id?: string;
  name: string;
  slug: string;
  parentId?: string;
  image: string | null;
  children: Category[];
};
