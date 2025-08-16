import type { IProduct } from "../../types/products";
import { api } from "./api";

async function getProducts() {
  const res = await api.get<IProduct[]>("/Products");
  return res.data;
}

export const productsService = {
  getProducts,
};
