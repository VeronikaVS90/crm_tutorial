import { type UseFormReturn, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { type FinancialFormType } from "./lib";
import { FinanceMonth, type FinanceYear } from "../../types/financial";
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

  const years: number[] = Array.from(
    { length: 2035 - 2025 + 1 },
    (_, i) => 2025 + i
  );

  return (
    <form>
      <Box display="flex" gap={2}>
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

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" disabled={disabled}>
              <InputLabel required id="year-select-label">
                Year
              </InputLabel>
              <Select
                labelId="year-select-label"
                {...field}
                label="Year"
                error={!!errors.year}
                MenuProps={menuProps}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(Number(e.target.value) as FinanceYear)
                }
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.year && (
                <FormHelperText error>{errors.year.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

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
