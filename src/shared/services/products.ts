import type { ICreateProductBody, IProduct } from "../../types/products";
import { api } from "./api";

async function getProducts() {
  const res = await api.get<IProduct[]>("/products");
  return res.data;
}

async function createProduct(data: ICreateProductBody) {
  const res = await api.post<IProduct>("/products", data);
  return res.data;
}

export const productsService = {
  getProducts,
  createProduct,
};
