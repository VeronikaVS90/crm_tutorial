import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormType } from "./lib";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  LinearProgress,
  Link as MuiLink,
} from "@mui/material";
import {
  MailOutline as MailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
  disabled: boolean;
  defaultValues?: Partial<LoginFormType>;
}

export default function LoginForm({
  onSubmit,
  disabled,
  defaultValues,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    defaultValues,
  });

  const isBusy = disabled || isSubmitting;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, sm: 3 },
        bgcolor: "transparent",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          bgcolor: "rgba(255,255,255,0.98)",
          boxShadow:
            "0 10px 30px rgba(2, 6, 23, 0.12), 0 2px 8px rgba(2, 6, 23, 0.08)",
        }}
      >
        <Stack spacing={3}>
          <Stack
            spacing={1}
            alignItems="center"
            textAlign="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ lineHeight: 1.2, letterSpacing: 0.2, maxWidth: 500 }}
            >
              Sign in to your account
            </Typography>
          </Stack>

          {(isSubmitting || disabled) && (
            <LinearProgress sx={{ borderRadius: 999 }} />
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                {...register("email")}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isBusy}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                {...register("password")}
                fullWidth
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isBusy}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        disabled={isBusy}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isBusy}
                fullWidth
                sx={{
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  height: 48,
                  boxShadow: (t) => `0 8px 18px ${t.palette.primary.main}44`,
                  ":hover": {
                    boxShadow: (t) => `0 10px 22px ${t.palette.primary.main}55`,
                  },
                }}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
          >
            Don’t have an account?{" "}
            <MuiLink
              component={RouterLink}
              to="/registration"
              underline="hover"
              fontWeight={700}
              sx={{ fontSize: "1rem", color: "primary.main" }}
            >
              Create one
            </MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
