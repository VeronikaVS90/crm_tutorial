import type { ITableColumn } from "../../../components/Table/lib";
import MonthBadge from "../../../shared/ui/MonthBadge";
import type { IFinance } from "../../../types/financial";

export const financialColumns: ITableColumn<IFinance>[] = [
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
  { id: "comment", label: "Comment" },
];
