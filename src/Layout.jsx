import React from 'react';
import ToastProvider from '@/components/ToastProvider';

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}