import { Chip } from "@mui/material";
import type { FinanceMonth } from "../../types/financial";

interface MonthBadgeProps {
  month: FinanceMonth;
}

const MonthColors: Record<FinanceMonth, string> = {
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

export default function MonthBadge({ month }: MonthBadgeProps) {
  return (
    <Chip
      label={month}
      sx={{
        backgroundColor: MonthColors[month],
        color: "#000",
        borderRadius: "16px",
        px: 2,
      }}
    />
  );
}
