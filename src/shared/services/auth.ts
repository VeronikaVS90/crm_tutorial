import { v4 as uuidv4 } from "uuid";
import type {
  ILoginBody,
  ILoginResponse,
  IRegisterBody,
  IRegisterResponse,
} from "../../types/auth";

import { authApi } from "./api";

async function register(data: IRegisterBody) {
  const res = await authApi.post<IRegisterResponse>("/auth/register", data);
  return res.data;
}

async function login(data: ILoginBody) {
  const res = await authApi.post<ILoginResponse>("/auth/login", data, {
    headers: { "X-Device-Id": uuidv4() },
  });
  return res.data;
}

export const authService = {
  register,
  login,
};
