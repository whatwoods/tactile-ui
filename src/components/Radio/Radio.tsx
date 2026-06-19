import React, { useId } from 'react';
import styles from './Radio.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({ label, className, id, ...props }) => {
  const reactId = useId();
  const generatedId = id || reactId;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.radioWrapper}>
        <input 
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
};
