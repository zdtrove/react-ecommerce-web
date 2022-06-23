import { uiTypes } from 'redux/types';

const initialState = {
  snackbar: {
    isShow: false,
    message: null,
    status: null
  },
  backdrop: false
};

const uiReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case uiTypes.SHOW_SNACKBAR: {
      const { message, status } = payload;
      return {
        ...state,
        snackbar: {
          isShow: true,
          message,
          status
        }
      };
    }
    case uiTypes.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          isShow: false
        }
      };
    case uiTypes.SHOW_BACKDROP:
      return {
        ...state,
        backdrop: true
      };
    case uiTypes.HIDE_BACKDROP:
      return {
        ...state,
        backdrop: false
      };
    default:
      return state;
  }
};

export default uiReducer;
