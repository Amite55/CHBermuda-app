// types/toast.types.ts
export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}
