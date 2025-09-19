import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});
