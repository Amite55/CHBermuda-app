// contexts/ToastContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import Toast from "../components/Toast";

// Type definitions
type ToastType = "success" | "error" | "warning" | "info";

interface ToastConfig {
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

// Create context with proper TypeScript type
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration: number = 2000
  ) => {
    // Clear any existing toast timeout
    setToast(null);

    // Set new toast
    setToast({
      message,
      type,
      duration,
    });

    // Auto hide after duration
    const timer = setTimeout(() => {
      setToast(null);
    }, duration);

    // Clean up timer when component unmounts or toast changes
    return () => clearTimeout(timer);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Render toast if exists */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
