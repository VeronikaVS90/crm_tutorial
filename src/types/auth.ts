export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  data: {
    user: IUser;
  };
  message: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
