import React, { useId } from 'react';
import styles from './Alert.module.css';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: 'neutral' | 'info' | 'success' | 'danger' | 'warning';
  title?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  banner?: boolean;
}

const iconPathByTone = {
  neutral: 'M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  info: 'M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  success: 'M20 6 9 17l-5-5',
  danger: 'M12 8v5m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  warning: 'M12 8v5m0 4h.01M10.3 4.3 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z',
};

export const Alert: React.FC<AlertProps> = ({
  tone = 'info',
  title,
  action,
  onClose,
  banner = false,
  children,
  className = '',
  ...props
}) => {
  const titleId = useId();
  const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';

  return (
    <div
      className={[styles.alert, styles[tone], banner ? styles.banner : '', className].filter(Boolean).join(' ')}
      role={role}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPathByTone[tone]} />
        </svg>
      </span>
      <div className={styles.content}>
        {title && <div id={titleId} className={styles.title}>{title}</div>}
        {children && <div className={styles.message}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
      {onClose && (
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="关闭提示">
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};
