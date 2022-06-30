import { User } from './user';

export type AuthState = {
  isLoggedIn?: boolean;
  loading?: boolean;
  user?: User | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  payments: string[];
  password: string;
  passwordConfirm: string;
  agree: boolean;
};

export type LoginResponse = {
  data: {
    message: string;
    accessToken: string;
    user: User;
  };
  status: number;
};

export type SignUpResponse = {
  data: {
    message: string;
    user: User;
  };
  status: number;
};

export type LogoutResponse = {
  status: number;
  message: string;
};
