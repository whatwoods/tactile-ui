import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  ariaLabel?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  activationMode = 'automatic',
  ariaLabel = 'Tabs',
  className = '',
}) => {
  const reactId = useId();
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const firstEnabled = items.find((item) => !item.disabled)?.id;
  const [internalValue, setInternalValue] = useState(defaultValue || firstEnabled || items[0]?.id);
  const [focusedValue, setFocusedValue] = useState(internalValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedItem = items.find((item) => item.id === selectedValue && !item.disabled) || items.find((item) => !item.disabled);
  const activeValue = selectedItem?.id;

  const setSelected = (nextValue: string) => {
    const nextItem = items.find((item) => item.id === nextValue);
    if (!nextItem || nextItem.disabled) return;
    if (!isControlled) setInternalValue(nextValue);
    setFocusedValue(nextValue);
    onChange?.(nextValue);
  };

  const enabledItems = items.filter((item) => !item.disabled);

  useEffect(() => {
    const activeElement = document.activeElement;
    if (!activeElement || !tabListRef.current?.contains(activeElement)) return;
    tabRefs.current.get(focusedValue)?.focus();
  }, [focusedValue]);

  const moveFocus = (direction: -1 | 1) => {
    if (enabledItems.length === 0) return;
    const baseIndex = enabledItems.findIndex((item) => item.id === focusedValue);
    const safeBase = baseIndex >= 0 ? baseIndex : enabledItems.findIndex((item) => item.id === activeValue);
    const next = enabledItems[(safeBase + direction + enabledItems.length) % enabledItems.length];
    setFocusedValue(next.id);
    if (activationMode === 'automatic') {
      setSelected(next.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const previousKeys = orientation === 'vertical' ? ['ArrowUp'] : ['ArrowLeft'];
    const nextKeys = orientation === 'vertical' ? ['ArrowDown'] : ['ArrowRight'];

    if (previousKeys.includes(event.key)) {
      event.preventDefault();
      moveFocus(-1);
    }
    if (nextKeys.includes(event.key)) {
      event.preventDefault();
      moveFocus(1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      const first = enabledItems[0];
      if (first) {
        if (activationMode === 'automatic') setSelected(first.id);
        else setFocusedValue(first.id);
      }
    }
    if (event.key === 'End') {
      event.preventDefault();
      const last = enabledItems[enabledItems.length - 1];
      if (last) {
        if (activationMode === 'automatic') setSelected(last.id);
        else setFocusedValue(last.id);
      }
    }
    if ((event.key === 'Enter' || event.key === ' ') && activationMode === 'manual') {
      event.preventDefault();
      setSelected(focusedValue);
    }
  };

  return (
    <div className={[styles.tabs, styles[orientation], className].filter(Boolean).join(' ')}>
      <div
        ref={tabListRef}
        className={styles.tabList}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const isSelected = item.id === activeValue;
          const isFocused = item.id === focusedValue || (focusedValue === undefined && isSelected);
          const tabId = `${reactId}-tab-${item.id}`;
          const panelId = `${reactId}-panel-${item.id}`;

          return (
            <button
              ref={(node) => {
                if (node) tabRefs.current.set(item.id, node);
                else tabRefs.current.delete(item.id);
              }}
              key={item.id}
              id={tabId}
              className={[styles.tab, isSelected ? styles.active : ''].filter(Boolean).join(' ')}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              disabled={item.disabled}
              tabIndex={isFocused && !item.disabled ? 0 : -1}
              onFocus={() => !item.disabled && setFocusedValue(item.id)}
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isSelected = item.id === activeValue;
        return (
          <div
            key={item.id}
            id={`${reactId}-panel-${item.id}`}
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`${reactId}-tab-${item.id}`}
            hidden={!isSelected}
            tabIndex={isSelected ? 0 : -1}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
