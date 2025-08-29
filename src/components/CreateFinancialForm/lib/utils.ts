import { object, string, mixed, number, boolean, type InferType } from "yup";
import { FinanceMonth } from "../../../types/financial";

export const createFinancialSchema = object({
  month: mixed<FinanceMonth>()
    .oneOf(Object.values(FinanceMonth))
    .required("Month is required."),
  isIncome: boolean(),
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
