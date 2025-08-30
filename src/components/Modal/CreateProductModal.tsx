import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import CreateProductForm from "../ProductForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import { productSchema, type ProductFormType } from "../ProductForm/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { productsStore } from "../../shared/store/products";
import { useState } from "react";
import { handleError } from "../../shared/services/errorHandler";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalBody({ onClose }: Pick<CreateProductModalProps, "onClose">) {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });
  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    try {
      setIsCreating(true);
      await productsStore.createProduct(data);
      form.reset();
    } catch (err) {
      handleError(err, "Failed to create product. Please, try again later.");
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
        Create a product
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <CreateProductForm form={form} disabled={isCreating} />
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
          disabled={isCreating}
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
}

export default function CreateProductModal({
  open,
  onClose,
}: CreateProductModalProps) {
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
