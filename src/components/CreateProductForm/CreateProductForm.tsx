import { type UseFormReturn } from "react-hook-form";
import { type CreateProduct } from "./lib";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";

interface CreateProductFormProps {
  form: UseFormReturn<CreateProduct>;
}

export default function CreateProductForm({ form }: CreateProductFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form>
      <TextField
        label="Name"
        {...register("name")}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Category"
        {...register("category")}
        fullWidth
        margin="normal"
        error={!!errors.category}
        helperText={errors.category?.message}
      />
      <TextField
        label="Price"
        type="number"
        {...register("price")}
        fullWidth
        margin="normal"
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Is Available"
        {...register("isAvailable")}
        checked={form.watch("isAvailable") || false}
      />
    </form>
  );
}
