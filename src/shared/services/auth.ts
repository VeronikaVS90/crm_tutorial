import type {
  ICurrentResponse,
  ILoginBody,
  ILoginResponse,
  IRegisterBody,
  IRegisterResponse,
} from "../../types/auth";

import { authApi } from "./api";
import { tokenStore } from "../store/tokens";

async function register(data: IRegisterBody) {
  const res = await authApi.post<IRegisterResponse>("/auth/register", data);
  return res.data;
}

async function login(data: ILoginBody) {
  const res = await authApi.post<ILoginResponse>("/auth/login", data);
  tokenStore.refreshToken = res.data.data.refreshToken;
  tokenStore.accessToken = res.data.data.accessToken;

  return res.data;
}

async function current() {
  const res = await authApi.get<ICurrentResponse>("/auth/current");
  return res.data;
}

export const authService = {
  register,
  login,
  current,
};
