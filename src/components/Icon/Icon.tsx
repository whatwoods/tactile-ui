import React from 'react';
import styles from './Icon.module.css';

export interface IconProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tone?: 'default' | 'muted' | 'primary' | 'inverse';
  surface?: boolean;
  label?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  children,
  size = 'md',
  tone = 'default',
  surface = false,
  label,
  className = '',
}) => {
  const rootClass = [
    styles.icon,
    styles[size],
    styles[tone],
    surface ? styles.surface : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={rootClass}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </span>
  );
};
