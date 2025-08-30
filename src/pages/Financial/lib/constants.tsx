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
  { id: "type", label: "Type" },
  { id: "transactions", label: "Transactions" },
  { id: "income", label: "Income" },
  { id: "outcome", label: "Outcome" },
  { id: "profit", label: "Profit" },
];
