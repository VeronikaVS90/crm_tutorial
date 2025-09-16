import { Box, Typography } from "@mui/material";
import type { IFinanceResponse } from "../../types/financial";

interface FinanceReadonlyInfoProps {
  finance: IFinanceResponse;
}

export default function FinanceReadonlyInfo({
  finance,
}: FinanceReadonlyInfoProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="body1">
        <strong>Calculation ID:</strong> {finance.id}
      </Typography>
      <Typography variant="body1">
        <strong>Average check:</strong> {finance.averageCheck}
      </Typography>
      <Typography variant="body1">
        <strong>Profit:</strong> {finance.profit}
      </Typography>
    </Box>
  );
}
