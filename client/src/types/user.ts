export type UserState = {
  users: User[];
  loading: boolean;
};

export type User = {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  gender: string;
  payments: string[];
  role: string;
  password?: string;
  passwordConfirm?: string;
};

export type AddOrUpdateUserResponse = {
  status: number;
  user: User;
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
