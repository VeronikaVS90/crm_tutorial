import { useMutation } from "@tanstack/react-query";
import RegistrationForm from "../../components/RegistrationForm";
import { authService } from "../../shared/services/auth";
import { useNavigate } from "react-router";
import { handleError } from "../../shared/services/errorHandler";

export default function Registration() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      handleError(error, "Failed to register a user. Please, try again later.");
    },
  });

  return <RegistrationForm disabled={isPending} onSubmit={mutate} />;
}
