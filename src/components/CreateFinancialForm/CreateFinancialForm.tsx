import { type UseFormReturn, Controller } from "react-hook-form";
import { type CreateFinancial } from "./lib";
import { FinanceMonth } from "../../types/financial";
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

interface CreateFinancialFormProps {
  form: UseFormReturn<CreateFinancial>;
}

export default function CreateFinancialForm({
  form,
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
    <>
      <Controller
        name="month"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
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
                  {month}
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
