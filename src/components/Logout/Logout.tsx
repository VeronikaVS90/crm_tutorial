import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../shared/services/auth";
import { authStore } from "../../shared/store/auth";
import { useNavigate } from "react-router";
import { handleError } from "../../shared/services/errorHandler";

export default function Logout() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      authStore.logout();
      navigate("/login");
    },
    onError: (error) => {
      handleError(error, "Failed to log out. Please, try again later.");
    },
  });

  return (
    <Button onClick={() => mutate()} color="inherit" disabled={isPending}>
      Log out
    </Button>
  );
}
