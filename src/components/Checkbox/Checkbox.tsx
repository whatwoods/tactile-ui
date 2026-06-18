import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, id, ...props }) => {
  const generatedId = id || Math.random().toString(36).substring(2, 9);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.checkboxWrapper}>
        <input 
          type="checkbox" 
          id={generatedId} 
          className={styles.input} 
          {...props} 
        />
        <div className={styles.box}>
          <svg className={styles.check} viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 4.5L4.5 7.5L10.5 1.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {label && <label htmlFor={generatedId} className={styles.label}>{label}</label>}
    </div>
  );
};
