import { object, string, number, boolean, type InferType } from "yup";

export const createProductSchema = object({
  category: string().required(),
  isAvailable: boolean().required(),
  name: string().required().min(2).max(100),
  price: number().required().positive(),
});

export type CreateProduct = InferType<typeof createProductSchema>;
