import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import CreateProductForm from "../CreateProductForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createProductSchema,
  type CreateProduct,
} from "../CreateProductForm/lib";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateProductModal({
  open,
  onClose,
}: CreateProductModalProps) {
  const form = useForm<CreateProduct>({
    resolver: yupResolver(createProductSchema),
  });
  const onSubmit: SubmitHandler<CreateProduct> = (data) => {
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
        Create a product
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <CreateProductForm form={form} />
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
