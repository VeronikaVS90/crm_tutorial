export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  message: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}
