import { type UseFormReturn, Controller } from "react-hook-form";
import { type ProductFormType } from "./lib";
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
import { ProductCategory } from "../../types/products";

interface ProductFormProps {
  form: UseFormReturn<ProductFormType>;
  disabled: boolean;
}

export default function ProductForm({ form, disabled }: ProductFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
  };

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
              {Object.values(ProductCategory).map((category) => (
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
