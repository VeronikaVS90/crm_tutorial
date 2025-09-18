import { Box, Typography, Chip } from "@mui/material";
import type { Product } from "../../shared/entities/product";

interface ProductReadonlyInfoProps {
  product: Product;
}

export default function ProductReadonlyInfo({
  product,
}: ProductReadonlyInfoProps) {
  return (
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
        color={product.ratingColor}
        variant="outlined"
        sx={{ width: "fit-content" }}
      />
    </Box>
  );
}
