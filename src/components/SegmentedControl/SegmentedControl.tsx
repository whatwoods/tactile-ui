import React from 'react';
import styles from './SegmentedControl.module.css';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const selectedIndex = Math.max(0, options.findIndex(o => o.value === currentValue));
  const moveSelection = (direction: -1 | 1) => {
    if (options.length === 0) return;
    const nextIndex = (selectedIndex + direction + options.length) % options.length;
    handleSelect(options[nextIndex].value);
  };

  return (
    <div
      className={styles.container}
      role="radiogroup"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          moveSelection(-1);
        }
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          moveSelection(1);
        }
      }}
    >
      {options.map((option, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => handleSelect(option.value)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
