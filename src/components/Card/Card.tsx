import React from 'react';
import { Button } from '../Button/Button';
import styles from './Card.module.css';

export interface CardProps {
  id?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onBack?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  id,
  children, 
  title,
  padding = 'md',
  className = '',
  onBack
}) => {
  return (
    <div id={id} className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.header}>
          {onBack && (
            <Button 
              variant="secondary"
              size="sm"
              className={styles.backButton}
              onClick={onBack}
            >
              <svg className={styles.backIcon} viewBox="0 0 8 14" fill="none">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>返回</span>
            </Button>
          )}
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles[`padding-${padding}`]}>
        {children}
      </div>
    </div>
  );
};
