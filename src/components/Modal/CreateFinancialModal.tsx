import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import CreateFinancialForm from "../CreateFinancialForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createFinancialSchema,
  type CreateFinancial,
} from "../CreateFinancialForm/lib";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateFinancialModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFinancialModal({
  open,
  onClose,
}: CreateFinancialModalProps) {
  const form = useForm<CreateFinancial>({
    resolver: yupResolver(createFinancialSchema),
  });
  const onSubmit: SubmitHandler<CreateFinancial> = (data) => {
    console.log(data);
    form.reset();
  };

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
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
          textTransform: "uppercase",
          pb: 1,
        }}
      >
        Create a transaction
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <CreateFinancialForm form={form} />
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
          type="button"
          variant="contained"
          onClick={form.handleSubmit(onSubmit)}
          sx={{ borderRadius: 2 }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
