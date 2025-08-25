import { type UseFormReturn, Controller } from "react-hook-form";
import { type CreateFinancial } from "./lib";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";

interface CreateFinancialFormProps {
  form: UseFormReturn<CreateFinancial>;
}

export default function CreateProductForm({ form }: CreateFinancialFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <>
      <TextField
        label="Month"
        {...register("month")}
        fullWidth
        margin="normal"
        error={!!errors.month}
        helperText={errors.month?.message}
      />
      <TextField
        label="Type"
        {...register("type")}
        fullWidth
        margin="normal"
        error={!!errors.type}
        helperText={errors.type?.message}
      />
      <TextField
        label="Amount"
        type="number"
        {...register("amount")}
        fullWidth
        margin="normal"
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />
      <Controller
        name="isIncome"
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
            label="Is Income"
          />
        )}
      />
    </>
  );
}
