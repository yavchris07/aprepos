import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "loading";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside provider");
  return ctx;
};