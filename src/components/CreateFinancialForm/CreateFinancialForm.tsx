import { type UseFormReturn, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { type CreateFinancial } from "./lib";
import { FinanceMonth } from "../../types/financial";
import MonthBadge from "../../shared/ui/MonthBadge";

interface CreateFinancialFormProps {
  form: UseFormReturn<CreateFinancial>;
  disabled: boolean;
}

export default function CreateFinancialForm({
  form,
  disabled,
}: CreateFinancialFormProps) {
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
      <Controller
        name="month"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" disabled={disabled}>
            <InputLabel required id="month-select-label">
              Month
            </InputLabel>

            <Select
              labelId="month-select-label"
              {...field}
              label="Month"
              error={!!errors.month}
              MenuProps={menuProps}
              value={field.value ?? ""}
            >
              {Object.values(FinanceMonth).map((month) => (
                <MenuItem key={month} value={month}>
                  <MonthBadge month={month} />
                </MenuItem>
              ))}
            </Select>

            {errors.month && (
              <FormHelperText error>{errors.month.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <TextField
        label="Type"
        {...register("type")}
        fullWidth
        margin="normal"
        error={!!errors.type}
        helperText={errors.type?.message}
        disabled={disabled}
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
      <Controller
        name="income"
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
            label="Is Income"
          />
        )}
      />
    </form>
  );
}
