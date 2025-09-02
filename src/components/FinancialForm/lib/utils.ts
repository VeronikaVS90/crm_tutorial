import { object, string, mixed, number, boolean, type InferType } from "yup";
import { FinanceMonth } from "../../../types/financial";

export const financialSchema = object({
  month: mixed<FinanceMonth>()
    .oneOf(Object.values(FinanceMonth) as FinanceMonth[])
    .required("Month is required."),
  income: boolean().default(false),
  type: string()
    .required("Type is required.")
    .min(2, "Type is too short - must be at least 2 charachters")
    .max(30, "Type is too long - must be no more than 30 characters"),
  transactions: number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .required("Transactions is required.")
    .positive("Transactions must be a positive value."),
});

export type FinancialFormType = InferType<typeof financialSchema>;
