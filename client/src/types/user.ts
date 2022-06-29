export type UserState = {
  users: User[];
  loading: boolean;
};

export type User = {
  _id?: string;
  fullname: string;
  email: string;
  phone: string;
  city: string;
  gender: string;
  payments: string[];
  role: string;
};

export type AddOrUpdateUserResponse = {
  status: number;
  newUser: User;
};

export type DeleteUserResponse = {
  status: number;
};

export type GetAllUsersResponse = {
  data: {
    users: User[];
  };
  status: number;
};
