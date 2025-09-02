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
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router";

interface ProductInfoProps {
  product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const navigate = useNavigate();

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
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">
            <strong>Product ID:</strong> {product.id}
          </Typography>

          <Typography variant="body1">
            <strong>Created At:</strong>{" "}
            {new Date(product.createdAt).toLocaleString()}
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

          <ProductForm disabled form={form} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => navigate("/products")}
          type="button"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
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
