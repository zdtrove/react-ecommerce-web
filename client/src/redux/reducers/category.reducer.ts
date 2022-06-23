import { categoryTypes } from 'redux/types';

const { GET_CATEGORIES } = categoryTypes;

const initialState = {
  categories: []
};

const categoryReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload.categories
      };
    default:
      return state;
  }
};

export default categoryReducer;
