import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { type UseFormReturn, Controller } from "react-hook-form";
import { type ProductFormType } from "./lib";
import { ProductCategory } from "../../types/products";
import { useEffect } from "react";

interface ProductFormProps {
  form: UseFormReturn<ProductFormType>;
  disabled: boolean;
}

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

export default function ProductForm({ form, disabled }: ProductFormProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const price = watch("price");
  const amount = watch("amount");

  useEffect(() => {
    const priceValue = Number(price) || 0;
    const amountValue = Number(amount) || 0;
    const calculatedCost = priceValue * amountValue;
    setValue("cost", calculatedCost);
  }, [price, amount, setValue]);

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
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" disabled={disabled}>
            <InputLabel required id="category-select-label">
              Category
            </InputLabel>

            <Select
              labelId="category-select-label"
              {...field}
              label="Category"
              error={!!errors.category}
              MenuProps={menuProps}
              value={field.value ?? ""}
            >
              {[
                ...new Set(
                  [
                    ...Object.values(ProductCategory),
                    field.value &&
                    !Object.values(ProductCategory).includes(field.value)
                      ? field.value
                      : null,
                  ].filter(Boolean) as string[]
                ),
              ].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>

            {errors.category && (
              <FormHelperText error>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <TextField
        label="Amount"
        type="number"
        {...register("amount")}
        fullWidth
        margin="normal"
        error={!!errors.amount}
        helperText={errors.amount?.message}
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
      <TextField
        label="Cost"
        type="number"
        {...register("cost")}
        fullWidth
        margin="normal"
        disabled
        helperText="Automatically calculated (Price × Amount)"
        InputProps={{
          readOnly: true,
        }}
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
