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
  DialogTitle,
} from "@mui/material";

interface FinancialInfoProps {
  finance: IFinance;
}

export default function FinancialInfo({ finance }: FinancialInfoProps) {
  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      month: finance.month,
      income: finance.income,
      type: finance.type,
      transactions: finance.transactions,
    },
  });

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "start",
          textTransform: "uppercase",
          pb: 1,
        }}
      >
        Transaction id:
      </DialogTitle>
      <DialogContent>
        <Box>
          <div>Profit:</div>
          <FinancialForm disabled form={form} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button type="button" variant="outlined" sx={{ borderRadius: 2 }}>
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
