import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md';
  dot?: boolean;
  count?: number;
  max?: number;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  count,
  max = 99,
  children,
  className = '',
  ...props
}) => {
  const content = count !== undefined ? (count > max ? `${max}+` : count) : children;

  return (
    <span
      className={[
        styles.badge,
        styles[variant],
        styles[size],
        dot ? styles.dot : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={dot && typeof children === 'string' ? children : undefined}
      {...props}
    >
      {!dot && content}
    </span>
  );
};
