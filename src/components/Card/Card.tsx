import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  id?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  id,
  children, 
  title,
  padding = 'md',
  className = ''
}) => {
  return (
    <div id={id} className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles[`padding-${padding}`]}>
        {children}
      </div>
    </div>
  );
};
