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
