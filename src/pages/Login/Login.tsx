import { useMutation } from "@tanstack/react-query";

import { authService } from "../../shared/services/auth";
import type { LoginFormType } from "../../components/LoginForm/lib";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
  });
  const handleLogin = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm disabled={isPending} onSubmit={handleLogin} />
    </>
  );
}
