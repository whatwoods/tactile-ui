import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  loading = false,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
  const rootClass = `${styles.button} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ''} ${className || ''}`;

  return (
    <button
      type={type}
      className={rootClass.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className={styles.inner}>{children}</span>
      {loading && (
        <span className={styles.loadingIndicator} aria-hidden="true">
          <Spinner size={size === 'lg' ? 'md' : 'sm'} />
        </span>
      )}
    </button>
  );
};
