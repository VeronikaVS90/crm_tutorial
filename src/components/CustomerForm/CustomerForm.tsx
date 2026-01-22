import { TextField } from "@mui/material";
import { type UseFormReturn } from "react-hook-form";
import { type CustomerFormType } from "./lib";

interface CustomerFormProps {
    form: UseFormReturn<CustomerFormType>;
    disabled: boolean;
}

export default function CustomerForm({ form, disabled }: CustomerFormProps) {
    const { register, formState: { errors } } = form;

    return (
        <form>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                disabled={disabled}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")} />
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                disabled={disabled}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")} />
            <TextField
                label="Phone"
                fullWidth
                margin="normal"
                disabled={disabled}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone")} />
            <TextField
                label="Company"
                fullWidth
                margin="normal"
                disabled={disabled}
                error={!!errors.company}
                helperText={errors.company?.message}
                {...register("company")} />
            <TextField
                label="Notes"
                fullWidth
                margin="normal"
                disabled={disabled}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                {...register("name")} />
        </form>
    )
}

