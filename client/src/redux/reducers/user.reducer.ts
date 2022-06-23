import { User } from 'constants/types';
import { userTypes } from 'redux/types';

const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = userTypes;

const initialState = {
  users: []
};

type PayloadType = {
  type: string;
  payload: any;
};

const userReducer = (state = initialState, { type, payload }: PayloadType) => {
  switch (type) {
    case ADD_USER: {
      return {
        ...state
        // users: state.users.push(payload.newUser)
      };
    }
    case GET_USERS:
      return {
        ...state,
        users: payload.users
      };
    case UPDATE_USER: {
      const users = state.users;
      // eslint-disable-next-line no-unused-vars
      const index = users.findIndex((user: User) => user._id === payload.newUser._id);
      // users[index] = payload.newUser;
      return {
        ...state,
        users
      };
    }
    case DELETE_USER: {
      let users = state.users;
      const index = users.findIndex((user: User) => user._id === payload.userDelete._id);
      users = users.splice(index, 1);
      return {
        ...state,
        users
      };
    }
    default:
      return state;
  }
};

export default userReducer;
