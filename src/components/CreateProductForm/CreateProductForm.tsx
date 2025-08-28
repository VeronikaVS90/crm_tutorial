import { type UseFormReturn, Controller } from "react-hook-form";
import { type CreateProduct } from "./lib";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";

interface CreateProductFormProps {
  form: UseFormReturn<CreateProduct>;
  disabled: boolean;
}

export default function CreateProductForm({
  form,
  disabled,
}: CreateProductFormProps) {
  const {
    register,
    control,
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
        disabled={disabled}
      />
      <TextField
        label="Category"
        {...register("category")}
        fullWidth
        margin="normal"
        error={!!errors.category}
        helperText={errors.category?.message}
        disabled={disabled}
      />
      <TextField
        label="Price"
        type="number"
        {...register("price")}
        fullWidth
        margin="normal"
        error={!!errors.price}
        helperText={errors.price?.message}
        disabled={disabled}
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
                disabled={disabled}
              />
            }
            label="Is Available"
          />
        )}
      />
    </form>
  );
}
