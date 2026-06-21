import React, { useId } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  id,
  resize = 'vertical',
  ...props
}) => {
  const reactId = useId();
  const textareaId = id || reactId;

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={textareaId} className={styles.label}>{label}</label>}
      <div className={styles.textareaWrapper}>
        <textarea
          id={textareaId}
          className={[
            styles.textarea,
            styles[resize],
            error ? styles.hasError : '',
          ].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
      </div>
      {error && <span id={`${textareaId}-error`} className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
