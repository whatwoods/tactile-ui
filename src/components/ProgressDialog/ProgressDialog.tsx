import React, { useEffect } from 'react';
import styles from './ProgressDialog.module.css';

export interface ProgressDialogProps {
  isOpen: boolean;
  title?: React.ReactNode;
  message?: React.ReactNode;
}

export const ProgressDialog: React.FC<ProgressDialogProps> = ({
  isOpen,
  title,
  message,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
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
