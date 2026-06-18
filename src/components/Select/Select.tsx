import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string; /* The label to show on the left */
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '请选择',
  label,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const selectedOption = options.find((o) => o.value === currentValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: Option) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''}`} ref={containerRef}>
      
      <div 
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`} 
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <div className={styles.placeholder}>
          {label || placeholder}
        </div>
        
        <div className={styles.valueArea}>
          <span className={styles.value}>
            {selectedOption ? selectedOption.label : ''}
          </span>
          <div className={styles.icon}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L6 11H18L12 5Z" />
              <path d="M12 19L18 13H6L12 19Z" />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.menuHeader}>
            <span className={styles.menuTitle}>{label || placeholder}</span>
          </div>
          <ul className={styles.list}>
              {options.map((option) => (
                <li 
                  key={option.value} 
                  className={`${styles.item} ${currentValue === option.value ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
