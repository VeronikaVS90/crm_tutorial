import type {
  IFinanceResponse,
  FinanceMonth,
  TransactionType,
} from "../../types/financial";

export class Finance {
  id: string;
  month: FinanceMonth;
  year: number;
  type: TransactionType;
  transactions: number;
  income: number;
  outcome: number;
  profit: number;
  averageCheck: number;
  comment: string;
  customerId?: string;

  constructor(finance: IFinanceResponse) {
    this.id = finance.id;
    this.month = finance.month;
    this.year = finance.year;
    this.type = finance.type;
    this.transactions = finance.transactions;
    this.income = finance.income;
    this.outcome = finance.outcome;
    this.profit = finance.profit;
    this.averageCheck = finance.averageCheck;
    this.comment = finance.comment;
    this.customerId = finance.customerId;
  }
}
