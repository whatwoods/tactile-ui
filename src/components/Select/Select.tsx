import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string; /* The label to show on the left */
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '请选择',
  label,
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reactId = useId();
  const listboxId = `${reactId}-listbox`;
  const labelId = `${reactId}-label`;
  const valueId = `${reactId}-value`;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const selectedOption = options.find((o) => o.value === currentValue);
  const selectedIndex = options.findIndex((o) => o.value === currentValue);
  const activeOption = activeIndex >= 0 ? options[activeIndex] : undefined;
  const activeOptionId = isOpen && activeOption ? `${reactId}-option-${activeOption.value}` : undefined;

  const getInitialActiveIndex = (direction: 1 | -1 = 1) => {
    if (options.length === 0) return -1;
    if (selectedIndex >= 0) return selectedIndex;
    return direction === 1 ? 0 : options.length - 1;
  };

  const openList = (direction: 1 | -1 = 1) => {
    if (disabled) return;
    setActiveIndex(getInitialActiveIndex(direction));
    setIsOpen(true);
  };

  const closeList = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeList();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeList]);

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) closeList();
    else openList();
  };

  const handleSelect = (option: SelectOption) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    closeList();
    triggerRef.current?.focus({ preventScroll: true });
  };

  const moveActive = (direction: -1 | 1) => {
    if (options.length === 0) return;
    const baseIndex = activeIndex >= 0 ? activeIndex : getInitialActiveIndex(direction);
    const nextIndex = (baseIndex + direction + options.length) % options.length;
    setActiveIndex(nextIndex);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isOpen && activeIndex >= 0) {
        handleSelect(options[activeIndex]);
      } else {
        openList();
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeList();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        openList(1);
      } else {
        moveActive(1);
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openList(-1);
      } else {
        moveActive(-1);
      }
    }
    if (isOpen && event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    }
    if (isOpen && event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }
    if (event.key === 'Tab') {
      closeList();
    }
  };

  return (
    <div className={[styles.container, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')} ref={containerRef}>
      
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`} 
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={activeOptionId}
        aria-labelledby={ariaLabel ? undefined : `${labelId} ${valueId}`}
        aria-label={ariaLabel}
      >
        <div id={labelId} className={styles.placeholder}>
          {label || placeholder}
        </div>
        
        <div className={styles.valueArea}>
          <span id={valueId} className={styles.value}>
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
              {options.map((option, index) => (
                <li 
                  key={option.value} 
                  id={`${reactId}-option-${option.value}`}
                  className={[
                    styles.item,
                    currentValue === option.value ? styles.selected : '',
                    activeIndex === index ? styles.activeOption : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
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
