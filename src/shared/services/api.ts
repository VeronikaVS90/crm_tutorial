import { v4 as uuidv4, validate } from "uuid";
import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "../store/tokens";
import type { IRefreshResponse } from "../../types/auth";

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const DEVICE_ID_KEY = "deviceId";
const savedDeviceId = localStorage.getItem(DEVICE_ID_KEY);
const DEVICE_ID =
  savedDeviceId && validate(savedDeviceId) ? savedDeviceId : uuidv4();
localStorage.setItem(DEVICE_ID_KEY, DEVICE_ID);

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    "X-Device-Id": DEVICE_ID,
  },
});

async function refreshTokens() {
  const res = await axios.post<IRefreshResponse>(
    `${import.meta.env.VITE_AUTH_API_URL}/auth/refresh`,
    undefined,
    {
      headers: {
        "X-Device-Id": DEVICE_ID,
        "X-Refresh-Token": tokenStore.refreshToken,
      },
    }
  );
  tokenStore.refreshToken = res.data.data.refreshToken;
  tokenStore.accessToken = res.data.data.accessToken;
}

authApi.interceptors.request.use((config) => {
  if (tokenStore.accessToken) {
    config.headers.Authorization = `Bearer ${tokenStore.accessToken}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!isAxiosError(err)) {
      return Promise.reject(err);
    }

    const requestConfig: IAxiosRequestConfig | undefined = err.config;

    if (
      err.response?.status !== 401 ||
      !requestConfig ||
      requestConfig._isRetry
    ) {
      return Promise.reject(err);
    }

    requestConfig._isRetry = true;

    try {
      await refreshTokens();
      return authApi.request(requestConfig);
    } catch {
      tokenStore.clear();
      return Promise.reject(err);
    }
  }
);
