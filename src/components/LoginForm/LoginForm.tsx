import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormType } from "./lib";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
  disabled: boolean;
}

export default function LoginForm({ onSubmit, disabled }: LoginFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
