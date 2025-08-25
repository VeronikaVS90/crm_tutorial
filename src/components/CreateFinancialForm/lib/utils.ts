import { object, string, number, boolean, type InferType } from "yup";

export const createFinancialSchema = object({
  month: string().required("Month is required."),
  isIncome: boolean().required(),
  type: string()
    .required("Type is required.")
    .min(2, "Type is too short - must be at least 2 charachters")
    .max(30, "Type is too long - must be no more than 30 characters"),
  amount: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Amount is required.")
    .positive("Amount must be a positive value."),
});

export type CreateFinancial = InferType<typeof createFinancialSchema>;
