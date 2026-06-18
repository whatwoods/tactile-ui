import React from 'react';
import styles from './List.module.css';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export const List: React.FC<ListProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.list} ${className}`}>
      {children}
    </div>
  );
};
