import React, { useState, useRef, useEffect, useId } from 'react';
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
  const listboxId = useId();

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const selectedOption = options.find((o) => o.value === currentValue);
  const selectedIndex = options.findIndex((o) => o.value === currentValue);

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

  const moveSelection = (direction: -1 | 1) => {
    if (options.length === 0) return;
    const baseIndex = selectedIndex >= 0 ? selectedIndex : direction === 1 ? -1 : 0;
    const nextIndex = (baseIndex + direction + options.length) % options.length;
    handleSelect(options[nextIndex]);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((open) => !open);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        moveSelection(1);
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        moveSelection(-1);
      }
    }
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''}`} ref={containerRef}>
      
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`} 
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
      >
        <div className={styles.placeholder}>
          {label || placeholder}
        </div>
        
        <div className={styles.valueArea}>
          <span className={styles.value}>
            {selectedOption ? selectedOption.label : ''}
          </span>
          <div className={styles.icon}>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 5L6 11H18L12 5Z" />
              <path d="M12 19L18 13H6L12 19Z" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.menuHeader}>
            <span className={styles.menuTitle}>{label || placeholder}</span>
          </div>
          <ul className={styles.list} id={listboxId} role="listbox">
              {options.map((option) => (
                <li 
                  key={option.value} 
                  className={`${styles.item} ${currentValue === option.value ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={currentValue === option.value}
                  tabIndex={-1}
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
