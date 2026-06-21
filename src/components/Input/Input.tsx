import React, { useId, useState } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, id, type, ...props }) => {
  const reactId = useId();
  const generatedId = id || reactId;
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {label && <label htmlFor={generatedId} className={styles.label}>{label}</label>}
      <div className={`${styles.inputWrapper} ${isPassword ? styles.passwordWrapper : ''}`}>
        <input 
          id={generatedId}
          type={inputType}
          className={`${styles.input} ${error ? styles.hasError : ''} ${isPassword ? styles.inputPassword : ''}`} 
          {...props} 
        />
        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '隐藏密码' : '显示密码'}
          >
            {showPassword ? (
              /* Eye open icon */
              <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11 Q12 23 20 11 M7.5 14.8 L9.3 17.3 M12 17 L13.8 19.5 M16.5 14.8 L18.3 17.3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
