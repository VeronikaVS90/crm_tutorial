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
  Chip,
} from "@mui/material";
import { type CreateFinancial } from "./lib";
import { FinanceMonth } from "../../types/financial";
import { MonthColors } from "../../types/financial";

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
            <InputLabel id="month-select-label">Month</InputLabel>

            <Select
              labelId="month-select-label"
              {...field}
              label="Month"
              error={!!errors.month}
              MenuProps={menuProps}
            >
              {Object.values(FinanceMonth).map((month) => (
                <MenuItem key={month} value={month}>
                  <Chip
                    label={month}
                    sx={{
                      backgroundColor: MonthColors[month],
                      color: "#000",
                      borderRadius: "16px",
                      px: 2,
                    }}
                  />
                </MenuItem>
              ))}
            </Select>

            {/* <Button
              variant="outlined"
              onClick={() => form.setValue("month", "")}
              sx={{ mt: 1 }}
            >
              X
            </Button> */}
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
        name="isIncome"
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
