import { isAxiosError } from "axios";
import { notification } from "../../components/RootLayout";

export const handleError = (
  err: unknown,
  fallbackMessage = "Oops. Something went wrong..."
) => {
  console.error(err);

  if (isAxiosError<{ message?: string }>(err)) {
    const { data = { message: fallbackMessage } } = err.response ?? {};
    notification(data.message || fallbackMessage);
  } else if (err instanceof Error && err.message) {
    notification(err.message, "error");
  } else {
    notification(fallbackMessage, "error");
  }
};
