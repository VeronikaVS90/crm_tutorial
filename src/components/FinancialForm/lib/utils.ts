import { object, string, mixed, number, type InferType } from "yup";
import {
  FinanceMonth,
  type FinanceYear,
  TransactionType,
} from "../../../types/financial";

export const financialSchema = object({
  month: mixed<FinanceMonth>()
    .oneOf(Object.values(FinanceMonth) as FinanceMonth[])
    .required("Month is required."),
  year: mixed<FinanceYear>()
    .oneOf([
      2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
    ] as FinanceYear[])
    .required("Year is required."),
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
