import React from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  value?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  value,
  onClick,
  showChevron = false,
}) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component 
      className={`${styles.item} ${onClick ? styles.clickable : ''}`} 
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={`${styles.content} ${!icon ? styles.noIcon : ''}`}>
        <div className={styles.title}>{title}</div>
        {value && <div className={styles.value}>{value}</div>}
        {showChevron && (
          <div className={styles.chevron}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L1 13" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </Component>
  );
};
