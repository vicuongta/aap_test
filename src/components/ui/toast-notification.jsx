import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ToastNotification({ type = 'success', title, message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      borderColor: 'border-l-[#2d6a4f]',
      iconColor: 'text-[#2d6a4f]',
      bgColor: 'bg-[#2d6a4f]/5'
    },
    error: {
      icon: XCircle,
      borderColor: 'border-l-rose-500',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/50'
    }
  };

  const { icon: Icon, borderColor, iconColor, bgColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "flex items-center gap-3 bg-white border-l-4 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md",
        borderColor,
        bgColor
      )}
    >
      <Icon className={cn("w-6 h-6 flex-shrink-0", iconColor)} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xs font-medium uppercase tracking-wider flex-shrink-0"
        >
          CLOSE
        </button>
      )}
    </motion.div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Toast Manager Hook
let toastId = 0;
const toastListeners = new Set();

export function useToast() {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const listener = (toast) => {
      setToasts((prev) => [...prev, { ...toast, id: toast.id }]);
    };
    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (type, title, message, duration = 5000) => {
    const toast = { id: toastId++, type, title, message, duration };
    toastListeners.forEach((listener) => listener(toast));
  };

  return {
    toasts,
    removeToast,
    success: (title, message, duration) => showToast('success', title, message, duration),
    error: (title, message, duration) => showToast('error', title, message, duration),
  };
}

// Global toast functions
export const toast = {
  success: (title, message, duration = 5000) => {
    const toastObj = { id: toastId++, type: 'success', title, message, duration };
    toastListeners.forEach((listener) => listener(toastObj));
  },
  error: (title, message, duration = 5000) => {
    const toastObj = { id: toastId++, type: 'error', title, message, duration };
    toastListeners.forEach((listener) => listener(toastObj));
  },
};