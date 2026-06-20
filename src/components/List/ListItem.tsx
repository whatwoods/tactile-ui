import React from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  value?: React.ReactNode;
  accessory?: 'none' | 'chevron' | 'check';
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
  accessory,
  onClick,
  showChevron = false,
  selected = false,
  disabled = false,
  className = '',
}) => {
  const Component = onClick ? 'button' : 'div';
  const resolvedAccessory = accessory ?? (showChevron ? 'chevron' : 'none');
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
      data-accessory={resolvedAccessory}
      onClick={disabled ? undefined : onClick}
      type={onClick ? 'button' : undefined}
      disabled={onClick ? disabled : undefined}
      aria-disabled={disabled || undefined}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={`${styles.content} ${!icon ? styles.noIcon : ''} ${resolvedAccessory === 'check' ? styles.checkContent : ''}`}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        {value && <div className={styles.value}>{value}</div>}
        {resolvedAccessory === 'chevron' && (
          <div className={styles.chevron}>
            <svg className={styles.chevronSvg} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {resolvedAccessory === 'check' && (
          <div className={styles.check} aria-hidden={!selected}>
            {selected && (
              <svg className={styles.checkSvg} viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5L5.4 10L14 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        )}
      </div>
    </Component>
  );
};
