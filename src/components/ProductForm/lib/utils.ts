import { object, string, number, boolean, type InferType } from "yup";

export const productSchema = object({
  category: string()
    .required("Category is required.")
    .min(2, "Category is too short - must be at least 2 charachters")
    .max(30, "Category is too long - must be no more than 30 characters"),
  isAvailable: boolean().default(false),
  name: string()
    .required("Name is required.")
    .min(2, "Name is too short - must be at least 2 charachters")
    .max(30, "Name is too long - must be no more than 30 characters"),
  price: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Price is required.")
    .positive("Price must be a positive value."),
});

export type ProductFormType = InferType<typeof productSchema>;
