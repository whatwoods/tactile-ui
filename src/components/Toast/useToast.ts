import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'danger';

export interface ToastAction {
  label: ReactNode;
  onClick: () => void;
  altText?: string;
}

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number | false;
  action?: ToastAction;
}

export interface ToastContextValue {
  toast: (content: string | ToastOptions, options?: Partial<ToastOptions>) => string;
  close: (id: string) => void;
  clear: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
