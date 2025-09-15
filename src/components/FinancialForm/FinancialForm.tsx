import { Controller, type UseFormReturn } from "react-hook-form";
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
import { FinanceMonth, TransactionType } from "../../types/financial";
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

  const currentYear = new Date().getFullYear();

  return (
    <form>
      <Box display="flex" gap={2}>
        <Controller
          name="month"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" disabled={disabled}>
              <InputLabel required>Month</InputLabel>
              <Select
                {...field}
                label="Month"
                error={!!errors.month}
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
          label="Year"
          type="number"
          fullWidth
          margin="normal"
          disabled={disabled}
          error={!!errors.year}
          helperText={errors.year?.message}
          placeholder={String(currentYear)}
          inputProps={{ min: 2000, max: 2100, step: 1 }}
          {...register("year", { valueAsNumber: true })}
        />
      </Box>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" disabled={disabled}>
            <InputLabel required>Type</InputLabel>
            <Select
              {...field}
              label="Type"
              error={!!errors.type}
              value={field.value ?? ""}
            >
              {Object.values(TransactionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.type && (
              <FormHelperText error>{errors.type.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <TextField
        label="Transactions (amount)"
        type="number"
        fullWidth
        margin="normal"
        disabled={disabled}
        error={!!errors.transactions}
        helperText={errors.transactions?.message}
        {...register("transactions", { valueAsNumber: true })}
      />

      <TextField
        label="Income"
        type="number"
        fullWidth
        margin="normal"
        disabled={disabled}
        error={!!errors.income}
        helperText={errors.income?.message}
        {...register("income", { valueAsNumber: true })}
      />

      <TextField
        label="Outcome"
        type="number"
        fullWidth
        margin="normal"
        disabled={disabled}
        error={!!errors.outcome}
        helperText={errors.outcome?.message}
        {...register("outcome", { valueAsNumber: true })}
      />

      <TextField
        label="Comment"
        fullWidth
        margin="normal"
        disabled={disabled}
        error={!!errors.comment}
        helperText={errors.comment?.message}
        {...register("comment")}
      />
    </form>
  );
}
