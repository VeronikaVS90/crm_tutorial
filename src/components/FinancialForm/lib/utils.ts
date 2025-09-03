import { object, string, mixed, number, type InferType } from "yup";
import { FinanceMonth } from "../../../types/financial";

export const financialSchema = object({
  month: mixed<FinanceMonth>()
    .oneOf(Object.values(FinanceMonth) as FinanceMonth[])
    .required("Month is required."),
  income: number().required("Income is required"),
  outcome: number().required("Outcome is required"),
  type: string()
    .required("Type is required.")
    .min(2, "Type is too short - must be at least 2 charachters")
    .max(30, "Type is too long - must be no more than 30 characters"),
  transactions: number()
    .required("Transactions is required.")
    .positive("Transactions must be a positive value."),
  comment: string().nullable().default(null).required(),
});

export type FinancialFormType = InferType<typeof financialSchema>;
