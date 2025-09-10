import type {
  ICreateProductBody,
  IProduct,
  IUpdateProductBody,
} from "../../types/products";
import { api } from "./api";

async function getProducts() {
  const res = await api.get<IProduct[]>("/products");
  return res.data;
}

async function getProductById(productId: string) {
  const res = await api.get<IProduct>(`/products/${productId}`);
  return res.data;
}

async function createProduct(data: ICreateProductBody) {
  const res = await api.post<IProduct>("/products", data);
  return res.data;
}

async function updateProduct({ id, ...data }: IUpdateProductBody) {
  const res = await api.put<IProduct>(`/products/${id}`, data);
  return res.data;
}

async function deleteProduct(productId: string) {
  await api.delete(`/products/${productId}`);
}

export const productsService = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
