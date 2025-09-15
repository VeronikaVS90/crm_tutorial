import type {
  ICreateProductBody,
  IGetProductParams,
  IProductResponse,
  IUpdateProductBody,
} from "../../types/products";
import { Product } from "../entities/product";
import { api } from "./api";

async function getProducts(params?: IGetProductParams) {
  const res = await api.get<IProductResponse[]>("/products", { params });
  return res.data;
}

async function getProductById(productId: string) {
  const res = await api.get<IProductResponse>(`/products/${productId}`);
  return new Product(res.data);
}

async function createProduct(data: ICreateProductBody) {
  const res = await api.post<IProductResponse>("/products", data);
  return res.data;
}

async function updateProduct({ id, ...data }: IUpdateProductBody) {
  const res = await api.put<IProductResponse>(`/products/${id}`, data);
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
