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

export const imageShow = (src: any, handleLightBox?: any) => {
  if (handleLightBox) {
    return <img onClick={() => handleLightBox(src)} src={src} alt="images" />;
  } else {
    return <img src={src} alt="images" />;
  }
};

export const findIndex = (items: any[], payload: any) => {
  return items.findIndex((item) => item._id === payload._id);
};

export const formatNumber = (value: number) => {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
