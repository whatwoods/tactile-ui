import React, { useState } from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'positive' | 'negative';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'positive',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={`${styles.switch} ${isChecked ? styles.checked : ''} ${styles[variant]}`}
      onClick={handleToggle}
      type="button"
    >
      <div className={styles.track}>
        <div className={`${styles.hole} ${styles.holeLeft}`}></div>
        <div className={`${styles.hole} ${styles.holeRight}`}></div>
      </div>
      <div className={styles.thumb}>
        <div className={styles.thumbDimple}></div>
      </div>
    </button>
  );
};
