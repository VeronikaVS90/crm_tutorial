import { type UseFormReturn, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { type FinancialFormType } from "./lib";
import { FinanceMonth } from "../../types/financial";
import MonthBadge from "../../shared/ui/MonthBadge";

interface FinancialFormProps {
  form: UseFormReturn<FinancialFormType>;
  disabled: boolean;
}

export default function FinancialForm({ form, disabled }: FinancialFormProps) {
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
        label="Type (e.g. sales, advertising, rental)"
        {...register("type")}
        fullWidth
        margin="normal"
        error={!!errors.type}
        helperText={errors.type?.message}
        disabled={disabled}
      />
      <TextField
        label="Transactions (amount)"
        type="number"
        {...register("transactions")}
        fullWidth
        margin="normal"
        error={!!errors.transactions}
        helperText={errors.transactions?.message}
        disabled={disabled}
      />
      <TextField
        label="Income"
        type="number"
        {...register("income")}
        fullWidth
        margin="normal"
        error={!!errors.income}
        helperText={errors.income?.message}
        disabled={disabled}
      />
      <TextField
        label="Outcome"
        type="number"
        {...register("outcome")}
        fullWidth
        margin="normal"
        error={!!errors.outcome}
        helperText={errors.outcome?.message}
        disabled={disabled}
      />
      <TextField
        label="Comment"
        {...register("comment")}
        fullWidth
        margin="normal"
        error={!!errors.comment}
        helperText={errors.comment?.message}
        disabled={disabled}
      />
    </form>
  );
}
