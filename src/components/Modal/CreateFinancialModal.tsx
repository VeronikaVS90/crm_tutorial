import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FinancialForm from "../FinancialForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import { financialSchema, type FinancialFormType } from "../FinancialForm/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleError } from "../../shared/services/errorHandler";
import { financialService } from "../../shared/services/financial";
import { queryKeys } from "../../shared/react-query/queryKeys";

interface CreateFinancialModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalBody({ onClose }: Pick<CreateFinancialModalProps, "onClose">) {
  const queryClient = useQueryClient();

  const { mutate: createFinance, isPending } = useMutation({
    mutationFn: financialService.createFinance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.financial.list });
    },
    onError: (error) => {
      handleError(
        error,
        "Failed to create calculation. Please, try again later."
      );
    },
  });

  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
  });
  const onSubmit: SubmitHandler<FinancialFormType> = (data) => {
    createFinance(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
          textTransform: "uppercase",
          pb: 1,
        }}
      >
        Create a calculation
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FinancialForm form={form} disabled={isPending} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={form.handleSubmit(onSubmit)}
          sx={{ borderRadius: 2 }}
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
}

export default function CreateFinancialModal({
  open,
  onClose,
}: CreateFinancialModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 2,
          backgroundColor: "#fafafa",
        },
      }}
    >
      <ModalBody onClose={onClose} />
    </Dialog>
  );
}
