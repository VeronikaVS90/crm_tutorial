import { useForm } from "react-hook-form";
import type { IProduct } from "../../types/products";
import ProductForm from "../ProductForm/ProductForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, type ProductFormType } from "../ProductForm/lib";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ProductInfoProps {
  product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      category: product.category,
      isAvailable: product.isAvailable,
      name: product.name,
      price: product.price,
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
        Product id:
      </DialogTitle>
      <DialogContent>
        <Box>
          <div>Created at:</div>
          <div>Rating:</div>
          <ProductForm disabled form={form} />
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
