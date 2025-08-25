import { type UseFormReturn, Controller } from "react-hook-form";
import { type CreateProduct } from "./lib";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";

interface CreateProductFormProps {
  form: UseFormReturn<CreateProduct>;
}

export default function CreateProductForm({ form }: CreateProductFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <>
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
      <Controller
        name="isAvailable"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Is Available"
          />
        )}
      />
    </>
  );
}
