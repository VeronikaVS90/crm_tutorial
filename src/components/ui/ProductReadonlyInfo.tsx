import { Box, Typography, Chip } from "@mui/material";

interface ProductReadonlyInfoProps {
  product: {
    id: string;
    createdAt: string;
    cost: number;
    rating: number;
  };
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
    </Box>
  );
}
