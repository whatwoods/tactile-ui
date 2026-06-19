import React from 'react';
import styles from './OneStepShortcut.module.css';

export interface OneStepShortcutProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: 'app' | 'contact' | 'previous';
  onClick?: () => void;
  className?: string;
}

export const OneStepShortcut: React.FC<OneStepShortcutProps> = ({
  icon,
  label,
  badge,
  variant = 'app',
  onClick,
  className = '',
}) => {
  const Component = onClick ? 'button' : 'div';
  const fallbackGlyph = typeof label === 'string' ? label.slice(0, 1) : variant === 'previous' ? '↺' : 'A';
  const rootClass = [
    styles.shortcut,
    styles[variant],
    onClick ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={rootClass}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      data-onestep-shortcut={variant}
      aria-label={typeof label === 'string' ? label : undefined}
    >
      <span className={styles.iconFrame}>
        {icon ?? <span className={styles.iconGlyph}>{fallbackGlyph}</span>}
        {badge && <span className={styles.badge}>{badge}</span>}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </Component>
  );
};
