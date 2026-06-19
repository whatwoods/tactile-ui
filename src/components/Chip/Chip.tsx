import React from 'react';
import styles from './Chip.module.css';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  compact?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  compact = false,
  className = '',
  ...props
}) => {
  const rootClass = [
    styles.chip,
    selected ? styles.selected : '',
    compact ? styles.compact : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={rootClass} {...props}>
      {children}
    </button>
  );
};
