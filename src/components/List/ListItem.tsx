import React from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  value?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  subtitle,
  value,
  onClick,
  showChevron = false,
  selected = false,
  disabled = false,
  className = '',
}) => {
  const Component = onClick ? 'button' : 'div';
  const rootClass = [
    styles.item,
    onClick ? styles.clickable : '',
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={rootClass}
      onClick={disabled ? undefined : onClick}
      type={onClick ? 'button' : undefined}
      disabled={onClick ? disabled : undefined}
      aria-disabled={disabled || undefined}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={`${styles.content} ${!icon ? styles.noIcon : ''}`}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        {value && <div className={styles.value}>{value}</div>}
        {showChevron && (
          <div className={styles.chevron}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </Component>
  );
};
