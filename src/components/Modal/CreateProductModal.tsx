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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a product</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <CreateProductForm form={form} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={form.handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
