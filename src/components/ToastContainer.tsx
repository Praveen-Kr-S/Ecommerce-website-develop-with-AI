import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-stone-900 text-white rounded-xl shadow-lg border border-stone-800 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-xs font-medium truncate text-stone-100">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
