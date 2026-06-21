import React, { useId } from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ label, className, id, ...props }, ref) => {
  const reactId = useId();
  const generatedId = id || reactId;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.radioWrapper}>
        <input 
          ref={ref}
          type="radio" 
          id={generatedId} 
          className={styles.input} 
          {...props} 
        />
        <div className={styles.circle}>
          <div className={styles.dot}></div>
        </div>
      </div>
      {label && <label htmlFor={generatedId} className={styles.label}>{label}</label>}
    </div>
  );
});

Radio.displayName = 'Radio';
