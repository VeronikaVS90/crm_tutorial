import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FinancialForm from "../FinancialForm";
import { financialSchema, type FinancialFormType } from "../FinancialForm/lib";
import { financialStore } from "../../shared/store/financial";
import { handleError } from "../../shared/services/errorHandler";

interface CreateFinancialModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalBody({ onClose }: Pick<CreateFinancialModalProps, "onClose">) {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
  });
  const onSubmit: SubmitHandler<FinancialFormType> = async (data) => {
    try {
      setIsCreating(true);
      await financialStore.createFinance(data);
      form.reset();
    } catch (err) {
      handleError(
        err,
        "Failed to create calculation. Please, try again later."
      );
    } finally {
      setIsCreating(false);
    }
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
          <FinancialForm form={form} disabled={isCreating} />
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
