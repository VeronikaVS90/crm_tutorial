import { useMutation } from "@tanstack/react-query";
import { authService } from "../../shared/services/auth";
import LoginForm from "../../components/LoginForm";
import CircularIndeterminate from "../../components/Loader/Loader";
import { handleError } from "../../shared/services/errorHandler";
import { authStore } from "../../shared/store/auth";
import { useLocation } from "react-router";

export default function Login() {
  const { state } = useLocation();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      authStore.login(res.data.user);
    },
    onError: (error) => {
      handleError(error, "Failed to log in. Please, try again later.");
    },
  });

  return (
    <>
      {isPending && <CircularIndeterminate />}
      <LoginForm
        disabled={isPending}
        onSubmit={mutate}
        defaultValues={{ email: state?.email ?? "" }}
      />
    </>
  );
}
