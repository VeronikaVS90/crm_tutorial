import { useForm } from "react-hook-form";
import type { IFinance } from "../../types/financial";
import FinancialForm from "../FinancialForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { financialSchema, type FinancialFormType } from "../FinancialForm/lib";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

interface FinancialInfoProps {
  finance: IFinance;
}

export default function FinancialInfo({ finance }: FinancialInfoProps) {
  const navigate = useNavigate();
  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      month: finance.month,
      income: finance.income,
      outcome: finance.outcome,
      type: finance.type,
      transactions: finance.transactions,
      comment: finance.comment,
    },
  });

  return (
    <>
      <DialogContent>
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

          <FinancialForm disabled form={form} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => navigate("/financial")}
          type="button"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Go back
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" sx={{ borderRadius: 2 }}>
            Update
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            Reset
          </Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 2 }}>
            Delete
          </Button>
        </Box>
      </DialogActions>
    </>
  );
}
