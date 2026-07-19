import { useState } from "react";
import { CheckCircle, XCircle, Loader2, X } from "lucide-react";
import {ToastContext,type Toast as ToastItem, type ToastType } from "./toast-context";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Container */}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-white border animate-slide-in"
          >
            {/* Icon */}
            {toast.type === "success" && (
              <CheckCircle className="text-green-500" />
            )}
            {toast.type === "error" && <XCircle className="text-red-500" />}
            {toast.type === "loading" && (
              <Loader2 className="animate-spin text-blue-500" />
            )}

            {/* Message */}
            <span className="text-sm text-gray-700">{toast.message}</span>

            {/* Close */}
            <button onClick={() => removeToast(toast.id)}>
              <X size={16} className="text-gray-400 hover:text-black" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
// ...existing code...