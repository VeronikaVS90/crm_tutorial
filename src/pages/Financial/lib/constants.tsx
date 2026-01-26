import type { ITableColumn } from "../../../components/Table/lib";
import MonthBadge from "../../../shared/ui/MonthBadge";
import type { IFinanceResponse } from "../../../types/financial";

export const financialColumns: ITableColumn<IFinanceResponse>[] = [
  { id: "id", label: "Id" },
  {
    id: "month",
    label: "Month",
    cell: ({ month }) => <MonthBadge month={month} />,
  },
  { id: "year", label: "Year" },
  { id: "type", label: "Type" },
  {
    id: "transactions",
    label: "Transactions",
    headerTooltip: "Amount of transactions",
  },
  { id: "income", label: "Income" },
  { id: "outcome", label: "Outcome" },
  { id: "profit", label: "Profit", headerTooltip: "Income - Outcome" },
  {
    id: "averageCheck",
    label: "Average Check",
    headerTooltip: "Income / Transactions",
  },
  {
    id: "customerId",
    label: "Customer",
    cell: ({ customerId }) => customerId ?? "-",
  },
  { id: "comment", label: "Comment" },
];
