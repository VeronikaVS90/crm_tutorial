import { useForm } from "react-hook-form";
import { registrationSchema, type RegistrationFormType } from "./lib";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormType) => void;
  disabled: boolean;
}

export default function RegistrationForm({
  onSubmit,
  disabled,
}: RegistrationFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationFormType>({
    resolver: yupResolver(registrationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="User Name"
        {...register("username")}
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
        disabled={disabled}
      />

      <TextField
        label="Email"
        {...register("email")}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={disabled}
      />
      <TextField
        label="Password"
        {...register("password")}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        disabled={disabled}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: 2 }}
        disabled={disabled}
      >
        Save
      </Button>
    </form>
  );
}
