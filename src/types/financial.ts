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

export interface IFinance {
  id: string;
  month: FinanceMonth;
  type: string;
  transactions: number;
  income: number;
  outcome: number;
  profit: number;
}

export interface ICreateFinanceBody {
  month: FinanceMonth;
  type: string;
  income: number;
  outcome: number;
  profit: number;
}
