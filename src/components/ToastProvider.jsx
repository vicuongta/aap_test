import React from 'react';
import { ToastContainer, useToast } from '@/components/ui/toast-notification';

export default function ToastProvider({ children }) {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}