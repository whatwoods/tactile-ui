import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'light' | 'dark';
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tone = 'light',
  label = '处理中',
  className = '',
  ...props
}) => (
  <span
    className={[styles.spinner, styles[size], styles[tone], className].filter(Boolean).join(' ')}
    role="progressbar"
    aria-label={label}
    {...props}
  >
    <span className={styles.core} aria-hidden="true" />
  </span>
);
