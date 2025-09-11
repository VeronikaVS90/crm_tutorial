import { useForm, type SubmitHandler } from "react-hook-form";
import type { IFinance, IUpdateFinanceBody } from "../../types/financial";
import FinancialForm from "../FinancialForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { financialSchema, type FinancialFormType } from "../FinancialForm/lib";
import { Box, Button, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useState } from "react";
import { handleError } from "../../shared/services/errorHandler";

interface FinancialInfoProps {
  finance: IFinance;
  onUpdateFinance: (data: IUpdateFinanceBody) => Promise<never | void>;
  onDeleteFinance: (financeId: string) => Promise<void>;
}

export default function FinancialInfo({
  finance,
  onUpdateFinance,
  onDeleteFinance,
}: FinancialInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      month: finance.month,
      year: finance.year,
      income: finance.income,
      outcome: finance.outcome,
      type: finance.type,
      transactions: finance.transactions,
      comment: finance.comment,
    },
  });

  const handleEnableForm = () => setEditMode(true);

  const handleResetForm = () => {
    setEditMode(false);
    form.reset({
      month: finance.month,
      year: finance.year,
      income: finance.income,
      outcome: finance.outcome,
      type: finance.type,
      transactions: finance.transactions,
      comment: finance.comment,
    });
  };

  const handleSubmitForm: SubmitHandler<FinancialFormType> = async (data) => {
    try {
      setIsUpdating(true);
      await onUpdateFinance({ ...data, id: finance.id });
      setEditMode(false);
    } catch (err) {
      handleError(
        err,
        "Failed to update calculation. Please, try again later."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteFinance = async () => {
    setIsDeleting(true);
    await onDeleteFinance(finance.id);
    setIsDeleting(false);
  };

  return (
    <>
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

        <FinancialForm disabled={!editMode || isUpdating} form={form} />
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Button
          onClick={() => navigate("/financial")}
          type="button"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Go back
        </Button>

        <Stack direction="row" spacing={2}>
          {editMode && (
            <Button
              onClick={form.handleSubmit(handleSubmitForm)}
              variant="contained"
              sx={{ borderRadius: 2 }}
              disabled={isUpdating}
            >
              Save
            </Button>
          )}

          {!editMode && (
            <Button
              onClick={handleEnableForm}
              startIcon={<EditIcon />}
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Edit
            </Button>
          )}

          {editMode && (
            <Button
              onClick={handleResetForm}
              variant="outlined"
              sx={{ borderRadius: 2 }}
              disabled={isUpdating}
            >
              Reset
            </Button>
          )}

          <Button
            onClick={handleDeleteFinance}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2 }}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
