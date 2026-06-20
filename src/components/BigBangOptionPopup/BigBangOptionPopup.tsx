import React, { useState } from 'react';
import styles from './BigBangOptionPopup.module.css';

export interface BigBangOption {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface BigBangOptionPopupProps {
  options: BigBangOption[];
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onSelect?: (index: number) => void;
  onDismiss?: () => void;
  arrowOffset?: number;
  className?: string;
}

export const BigBangOptionPopup: React.FC<BigBangOptionPopupProps> = ({
  options,
  selectedIndex,
  defaultSelectedIndex = 0,
  onSelect,
  onDismiss,
  arrowOffset = 0,
  className = '',
}) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
  const isControlled = selectedIndex !== undefined;
  const activeIndex = isControlled ? selectedIndex : internalSelectedIndex;

  const rootClass = [styles.popup, className].filter(Boolean).join(' ');
  const style = {
    '--bigbang-option-arrow-offset': `${arrowOffset}px`,
  } as React.CSSProperties;

  const handleSelect = (index: number) => {
    if (!isControlled) {
      setInternalSelectedIndex(index);
    }

    if (index !== activeIndex) {
      onSelect?.(index);
    }

    onDismiss?.();
  };

  return (
    <div className={rootClass} style={style} role="menu" aria-label="BigBang 搜索选项">
      <ul className={styles.list}>
        {options.map((option, index) => {
          const selected = index === activeIndex;

          return (
            <li key={index} className={styles.item}>
              <button
                type="button"
                className={styles.option}
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => handleSelect(index)}
              >
                <span className={styles.icon} aria-hidden={!option.icon}>
                  {option.icon}
                </span>
                <span className={styles.label}>{option.label}</span>
                <span className={`${styles.check} ${selected ? styles.checkVisible : ''}`} aria-hidden={!selected}>
                  <svg className={styles.checkSvg} viewBox="0 0 18 14" fill="none">
                    <path d="M2 7.2L6.5 11.5L16 2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <span className={styles.arrow} aria-hidden="true" />
    </div>
  );
};
