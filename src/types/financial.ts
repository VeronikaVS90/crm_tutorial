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

export const MonthColors: Record<FinanceMonth, string> = {
  January: "#90caf9",
  February: "#90caf9",
  March: "#f48fb1",
  April: "#f48fb1",
  May: "#f48fb1",
  June: "#80cbc4",
  July: "#80cbc4",
  August: "#80cbc4",
  September: "#ffcc80",
  October: "#ffcc80",
  November: "#ffcc80",
  December: "#90caf9",
};

export interface IFinance {
  id: string;
  month: FinanceMonth;
  monthColor: string;
  type: string;
  transactions: number;
  income: number;
  outcome: number;
  profit: number;
}

export interface ICreateFinanceBody {
  month: FinanceMonth;
  monthColor: string;
  type: string;
  amount: number;
  income: boolean;
}
