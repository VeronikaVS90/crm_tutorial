import { type UseFormReturn } from "react-hook-form";
import { type CreateProduct } from "./lib";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";

interface CreateProductFormProps {
  form: UseFormReturn<CreateProduct>;
}

export default function CreateProductForm({ form }: CreateProductFormProps) {
  const { register } = form;

  return (
    <form>
      <TextField label="Name" {...register("name")} fullWidth margin="normal" />
      <TextField
        label="Category"
        {...register("category")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        {...register("price")}
        fullWidth
        margin="normal"
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
