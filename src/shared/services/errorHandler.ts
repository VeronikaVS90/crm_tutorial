import { notification } from "../../components/RootLayout";

export const handleError = (
  err: unknown,
  fallbackMessage = "Oops. Something went wrong..."
) => {
  console.error(err);

  if (err instanceof Error && err.message) {
    notification(err.message, "error");
  } else {
    notification(fallbackMessage, "error");
  }
};
