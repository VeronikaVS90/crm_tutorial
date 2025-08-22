import { toast } from "react-toastify";
import type { ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notification = (
  message = "Oops. Something went wrong...",
  type: "success" | "error" = "error"
) => {
  const toastConfig = {
    position: "top-center" as ToastPosition,
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  if (type === "success") {
    toast.success(message, toastConfig);
    return;
  }

  toast.error(message, toastConfig);
};
