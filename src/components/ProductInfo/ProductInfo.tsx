import { useForm, type SubmitHandler } from "react-hook-form";
import type { IProduct, IUpdateProductBody } from "../../types/products";
import ProductForm from "../ProductForm/ProductForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, type ProductFormType } from "../ProductForm/lib";
import { Box, Button, Typography, Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useState } from "react";
import { handleError } from "../../shared/services/errorHandler";

interface ProductInfoProps {
  product: IProduct;
  onUpdateProduct: (data: IUpdateProductBody) => Promise<never | void>;
  onDeleteProduct: (productId: string) => Promise<void>;
}

export default function ProductInfo({
  product,
  onUpdateProduct,
  onDeleteProduct,
}: ProductInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      category: product.category,
      isAvailable: product.isAvailable,
      name: product.name,
      amount: product.amount,
      price: product.price,
    },
  });

  const handleEnableForm = () => {
    setEditMode(true);
  };

  const handleResetForm = () => {
    setEditMode(false);
    form.reset({
      category: product.category,
      isAvailable: product.isAvailable,
      name: product.name,
      amount: product.amount,
      price: product.price,
    });
  };

  const handleSubmitForm: SubmitHandler<ProductFormType> = async (data) => {
    try {
      setIsUpdating(true);
      await onUpdateProduct({ ...data, id: product.id });
      setEditMode(false);
    } catch (err) {
      handleError(err, "Failed to update product. Please, try again later.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    await onDeleteProduct(product.id);
    setIsDeleting(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">
          <strong>Product ID:</strong> {product.id}
        </Typography>

        <Typography variant="body1">
          <strong>Created At:</strong>{" "}
          {new Date(product.createdAt).toLocaleString()}
        </Typography>

        <Typography variant="body1">
          <strong>Cost:</strong> {product.cost}
        </Typography>

        <Chip
          label={`Rating: ${product.rating}`}
          color={
            product.rating >= 40
              ? "success"
              : product.rating >= 20
              ? "warning"
              : "error"
          }
          variant="outlined"
          sx={{ width: "fit-content" }}
        />

        <ProductForm disabled={!editMode || isUpdating} form={form} />
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Button
          onClick={() => navigate("/products")}
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
            onClick={handleDeleteProduct}
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
