import React from 'react';
import styles from './TitleBar.module.css';

export interface TitleBarProps {
  title: React.ReactNode;
  backLabel?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  onBack?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  className?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  backLabel = '返回',
  confirmLabel,
  onBack,
  onConfirm,
  confirmDisabled = false,
  className = '',
}) => {
  return (
    <div className={`${styles.titleBar} ${className}`.trim()}>
      <div className={styles.sideSlot}>
        {onBack && (
          <button className={styles.backButton} type="button" onClick={onBack}>
            <svg className={styles.backIcon} width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.buttonText}>{backLabel}</span>
          </button>
        )}
      </div>

      <h2 className={styles.title}>{title}</h2>

      <div className={`${styles.sideSlot} ${styles.rightSlot}`}>
        {confirmLabel && (
          <button
            className={styles.confirmButton}
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            <span className={styles.buttonText}>{confirmLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
