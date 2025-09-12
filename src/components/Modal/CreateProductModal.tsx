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
import { handleError } from "../../shared/services/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../../shared/services/products";
import { queryKeys } from "../../shared/react-query/queryKeys";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalBody({ onClose }: Pick<CreateProductModalProps, "onClose">) {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: productsService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.list });
    },
    onError: (error) => {
      handleError(error, "Failed to create product. Please, try again later.");
    },
  });

  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });
  const onSubmit: SubmitHandler<ProductFormType> = (data) => {
    createProduct(data, {
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
        Create a product
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <CreateProductForm form={form} disabled={isPending} />
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
          disabled={isPending}
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
