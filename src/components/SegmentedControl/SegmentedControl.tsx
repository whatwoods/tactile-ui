import React from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleSelect = (val: string) => {
    const option = options.find((item) => item.value === val);
    if (disabled || option?.disabled) return;
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const selectedIndex = options.findIndex(o => o.value === currentValue);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled);
  const moveSelection = (direction: -1 | 1) => {
    if (disabled || options.length === 0) return;
    const enabledOptions = options
      .map((option, index) => ({ option, index }))
      .filter(({ option }) => !option.disabled);
    if (enabledOptions.length === 0) return;
    const enabledIndex = enabledOptions.findIndex(({ index }) => index === activeIndex);
    const safeIndex = enabledIndex >= 0 ? enabledIndex : 0;
    const nextIndex = enabledOptions[(safeIndex + direction + enabledOptions.length) % enabledOptions.length].index;
    handleSelect(options[nextIndex].value);
  };

  return (
    <div
      className={styles.container}
      role="radiogroup"
      aria-disabled={disabled || undefined}
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
        const isActive = index === activeIndex;
        const isDisabled = disabled || option.disabled;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            aria-disabled={isDisabled || undefined}
            tabIndex={isActive && !isDisabled ? 0 : -1}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => handleSelect(option.value)}
            disabled={isDisabled}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
