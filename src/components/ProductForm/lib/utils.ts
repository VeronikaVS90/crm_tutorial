import { object, string, number, boolean, type InferType, mixed } from "yup";
import { ProductCategory } from "../../../types/products";

export const productSchema = object({
  category: mixed<ProductCategory>()
    .oneOf(Object.values(ProductCategory) as ProductCategory[])
    .required("Category is required."),
  isAvailable: boolean().default(false),
  name: string()
    .required("Name is required.")
    .min(2, "Name is too short - must be at least 2 charachters")
    .max(30, "Name is too long - must be no more than 30 characters"),
  amount: number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  price: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Price is required.")
    .positive("Price must be a positive value."),
  cost: number().default(0),
});

export type ProductFormType = InferType<typeof productSchema>;
