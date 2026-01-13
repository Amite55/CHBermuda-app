import { useToast } from "@/src/context/ToastContext";
import { getErrorMessage } from "@/src/utils/errorHandler";

export const useToastHelpers = () => {
  const { showToast, hideToast } = useToast();

  return {
    // Basic toast functions
    show: showToast,
    hide: hideToast,

    // Pre-configured toasts
    success: (message: string, duration?: number) =>
      showToast(message, "success", duration || 2000),

    error: (message: string, duration?: number) =>
      showToast(message, "error", duration || 3000),

    warning: (message: string, duration?: number) =>
      showToast(message, "warning", duration || 2500),

    info: (message: string, duration?: number) =>
      showToast(message, "info", duration || 2000),

    // Special functions
    loading: (message: string = "Loading...") => showToast(message, "info", 0),

    // ✅ ERROR HANDLING - FIXED VERSION
    showError: (error: any, duration?: number) => {
      const message = getErrorMessage(error);
      showToast(message, "error", duration || 3000);
    },

    // API specific errors==========================================================
    networkError: () => showToast("No internet connection", "error", 4000),
    serverError: () =>
      showToast("Server error. Please try again.", "error", 3000),
    authError: () => showToast("Please login again", "error", 3000),

    // dismiss: hideToast,
  };
};

// Method 1: Direct use
//   const { showToast } = useToast();

// Method 2: Using helpers
//   const toast = useToastHelpers();
