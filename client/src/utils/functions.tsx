import { Category, CategoryOption } from 'types/category';

export const createCategoryList = (
  categories: Category[],
  options: CategoryOption[] = [],
  level: number = 1,
  _id: string = ''
) => {
  categories.forEach((cat) => {
    if (cat._id !== _id) {
      options.push({
        name: cat.name,
        id: cat._id,
        level
      });
    }

    if (cat.children && cat.children.length > 0) {
      createCategoryList(cat.children, options, level + 1);
    }
  });

  return options;
};

export const findCategoryById = (categories: Category[], id: string, category: Category): any => {
  categories.forEach((cat) => {
    if (cat._id === id) {
      category.name = cat.name;
      category.image = cat.image;
    }
    if (cat.children && cat.children.length > 0) {
      findCategoryById(cat.children, id, category);
    }
  });
  return category;
};

export const findIndex = (items: any[], payload: any) => {
  return items.findIndex((item) => item._id === payload._id);
};

export const formatNumber = (value: number) => {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const convertDays = (date: Date): string => {
  var date1 = new Date(date);
  var date2 = new Date();
  var days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
  let result = '';

  if (days <= 7) {
    result = `${days} days ago`;
  } else if (days <= 31) {
    result = `${Math.floor(days / 7)} weeks ago`;
  } else if (days <= 365) {
    result = `${Math.floor(days / 30)} months ago`;
  } else {
    result = `${Math.floor(days / 365)} years ago`;
  }

  return result;
};
