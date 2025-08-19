import type { IProduct } from "../../types/products";
import { api } from "./api";

async function getProducts() {
  const res = await api.get<IProduct[]>("/products");
  return res.data;
}

export const productsService = {
  getProducts,
};
