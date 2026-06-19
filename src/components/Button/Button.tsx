import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}) => {
  const rootClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`;

  return (
    <button className={rootClass.trim()} {...props}>
      <span className={styles.inner}>{children}</span>
    </button>
  );
};
