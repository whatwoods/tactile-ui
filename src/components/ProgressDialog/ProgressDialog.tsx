import React, { useEffect } from 'react';
import styles from './ProgressDialog.module.css';

export interface ProgressDialogProps {
  isOpen: boolean;
  title?: React.ReactNode;
  message?: React.ReactNode;
  tone?: 'light' | 'dark';
}

export const ProgressDialog: React.FC<ProgressDialogProps> = ({
  isOpen,
  title,
  message,
  tone = 'light',
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.dialog} ${tone === 'dark' ? styles.dark : ''}`}
        role="dialog"
        aria-modal="true"
        aria-busy="true"
        aria-live="polite"
        aria-label={typeof title === 'string' ? title : '处理中'}
      >
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.spinner} role="progressbar" aria-valuetext="处理中">
          <span className={styles.spinnerCore}></span>
        </div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};
