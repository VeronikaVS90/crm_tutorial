export enum FinanceMonth {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}

export type FinanceYear =
  | 2025
  | 2026
  | 2027
  | 2028
  | 2029
  | 2030
  | 2031
  | 2032
  | 2033
  | 2034
  | 2035;

export enum TransactionType {
  Sale = "Sale", // Sale of products (income)
  Return = "Return", // Return of products (outcome)
  Purchase = "Purchase", // Purchase of products (outcome)
  Expense = "Expense", // Operatiтп expenses (outcome)
  Refund = "Refund", // Returning money to client (outcome)
  Shipping = "Shipping", // Customer pays for delivery, but company pays courier (mixed)
  Preorder = "Preorder", // Customer pays in advance, company spends on production/purchase (mixed)
  Dropshipping = "Dropshipping", // Customer pays, money goes to supplier (mixed)
  Comission = "Comission", // Income from sales minus marketplace/bank commission (mixed)
  Subscription = "Subscription", // Recurring payment: customer pays, company covers service costs (mixed)
  Other = "Other", // Other category
}

export interface IFinance {
  id: string;
  month: FinanceMonth;
  year: FinanceYear;
  type: string;
  transactions: number;
  income: number;
  outcome: number;
  profit: number;
  averageCheck: number;
  comment: string;
}

export interface ICreateFinanceBody {
  month: FinanceMonth;
  year: FinanceYear;
  type: string;
  transactions: number;
  income: number;
  outcome: number;
  comment: string;
}
