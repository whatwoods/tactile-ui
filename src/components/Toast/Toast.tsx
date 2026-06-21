import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ToastContext, type ToastOptions } from './useToast';
import styles from './Toast.module.css';

interface ToastRecord extends ToastOptions {
  id: string;
  createdAt: number;
}

const MIN_DURATION = 5000;

const normalizeToast = (content: string | ToastOptions, options?: Partial<ToastOptions>): ToastOptions => {
  if (typeof content === 'string') {
    return { title: content, ...options };
  }
  return { ...content, ...options };
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const close = useCallback((id: string) => {
    setToasts((items) => items.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback((content: string | ToastOptions, options?: Partial<ToastOptions>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const nextToast = normalizeToast(content, options);
    setToasts((items) => [
      ...items,
      {
        id,
        variant: 'default',
        createdAt: Date.now(),
        ...nextToast,
      },
    ]);
    return id;
  }, []);

  const value = useMemo(() => ({ toast, close, clear }), [clear, close, toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <ol className={[styles.viewport, styles[position]].join(' ')} aria-label="通知" tabIndex={-1}>
          {toasts.map((item) => (
            <ToastItem key={item.id} toast={item} onClose={() => close(item.id)} />
          ))}
        </ol>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: ToastRecord;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const timeoutRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const remainingRef = useRef(
    toast.duration === false
      ? 0
      : Math.max(toast.duration ?? MIN_DURATION, MIN_DURATION),
  );

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    if (toast.duration === false || toast.action) return;
    clearTimer();
    startedAtRef.current = Date.now();
    timeoutRef.current = window.setTimeout(onClose, remainingRef.current);
  }, [onClose, toast.action, toast.duration]);

  const pauseTimer = () => {
    if (toast.duration === false || toast.action) return;
    if (timeoutRef.current !== null) {
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current));
      clearTimer();
    }
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer]);

  const title = toast.title || toast.description;
  const description = toast.title ? toast.description : undefined;

  return (
    <li
      className={[styles.toast, styles[toast.variant || 'default']].join(' ')}
      role={toast.variant === 'danger' ? 'alert' : 'status'}
      aria-live={toast.variant === 'danger' ? 'assertive' : 'polite'}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      onFocus={pauseTimer}
      onBlur={startTimer}
    >
      <span className={styles.indicator} aria-hidden="true" />
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {toast.action && (
        <button
          type="button"
          className={styles.action}
          aria-label={toast.action.altText}
          onClick={() => {
            toast.action?.onClick();
            onClose();
          }}
        >
          {toast.action.label}
        </button>
      )}
      <button type="button" className={styles.close} onClick={onClose} aria-label="关闭通知">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  );
};
