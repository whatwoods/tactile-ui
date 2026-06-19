import React, { useState } from 'react';
import { Switch } from '../Switch/Switch';
import styles from './SettingItem.module.css';

type SettingItemAccessory = 'none' | 'chevron' | 'switch' | 'check';

export interface SettingItemProps {
  title: React.ReactNode;
  summary?: React.ReactNode;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  accessory?: SettingItemAccessory;
  selected?: boolean;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
  className?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  title,
  summary,
  value,
  icon,
  accessory = 'chevron',
  selected = false,
  disabled = false,
  checked,
  defaultChecked = false,
  onCheckedChange,
  onClick,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isSwitch = accessory === 'switch';
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const isClickable = Boolean(onClick) || isSwitch;
  const Component = isClickable ? 'button' : 'div';

  const handleSwitchChange = (nextChecked: boolean) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const handleRowClick = () => {
    if (disabled) return;
    if (isSwitch) {
      handleSwitchChange(!isChecked);
    }
    onClick?.();
  };

  const rootClass = [
    styles.item,
    isClickable ? styles.clickable : '',
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={rootClass}
      data-accessory={accessory}
      onClick={disabled || !isClickable ? undefined : handleRowClick}
      type={isClickable ? 'button' : undefined}
      disabled={isClickable ? disabled : undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={accessory === 'check' && isClickable ? selected : undefined}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.copy}>
        <span className={styles.title}>{title}</span>
        {summary && <span className={styles.summary}>{summary}</span>}
      </span>
      {value && <span className={styles.value}>{value}</span>}
      {accessory === 'chevron' && (
        <span className={styles.chevron} aria-hidden="true">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      {accessory === 'switch' && (
        <span className={styles.switchSlot}>
          <Switch checked={isChecked} disabled={disabled} onChange={handleSwitchChange} readOnly />
        </span>
      )}
      {accessory === 'check' && (
        <span className={`${styles.checkMark} ${selected ? styles.checkMarkVisible : ''}`} aria-hidden={!selected}>
          <svg className={styles.checkSvg} viewBox="0 0 15 11" fill="none">
            <path d="M1 5.5L5.4 10L14 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </Component>
  );
};
