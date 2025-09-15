import { object, string, mixed, number, type InferType } from "yup";
import { FinanceMonth, TransactionType } from "../../../types/financial";

export const financialSchema = object({
  month: mixed<FinanceMonth>()
    .oneOf(Object.values(FinanceMonth) as FinanceMonth[])
    .required("Month is required."),
  year: number()
    .required("Year is required.")
    .min(2000, "Year must be no earlier than 2000.")
    .max(2100, "Year must be no later than 2100"),
  income: number()
    .required("Income is required")
    .min(0, "Income must be greater than or equal to 0"),
  outcome: number()
    .required("Outcome is required")
    .min(0, "Outcome must be greater than or equal to 0"),
  type: mixed<TransactionType>()
    .oneOf(Object.values(TransactionType) as TransactionType[])
    .required("Type is required."),
  transactions: number()
    .required("Transactions is required.")
    .positive("Transactions must be a positive value."),
  comment: string().nullable().default(null).required(),
});

export type FinancialFormType = InferType<typeof financialSchema>;
