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

  return (
    <div className={styles.container} role="radiogroup">
      {options.map((option, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={option.value}
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
