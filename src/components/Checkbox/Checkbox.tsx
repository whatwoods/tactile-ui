import React, { useId } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, id, ...props }, ref) => {
  const reactId = useId();
  const generatedId = id || reactId;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.checkboxWrapper}>
        <input 
          ref={ref}
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
});

Checkbox.displayName = 'Checkbox';
