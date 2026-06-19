import React from 'react';
import styles from './OneStepTopBar.module.css';

export interface OneStepTopBarItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface OneStepTopBarProps {
  items?: OneStepTopBarItem[];
  disabled?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: OneStepTopBarItem[] = [
  { id: 'photos', label: '近期图片' },
  { id: 'files', label: '近期文件' },
  { id: 'clipboard', label: '剪贴板' },
];

const DEFAULT_GLYPHS: Record<string, string> = {
  photos: '图',
  files: '文',
  clipboard: '剪',
};

export const OneStepTopBar: React.FC<OneStepTopBarProps> = ({
  items = DEFAULT_ITEMS,
  disabled = false,
  className = '',
}) => {
  const rootClass = [
    styles.topBar,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass} aria-disabled={disabled} data-onestep-topbar>
      <span className={styles.dimSpace} aria-hidden="true" />
      <div className={styles.itemRow}>
        {items.slice(0, 3).map((item) => {
          const itemDisabled = disabled || item.disabled;
          const Component = item.onClick && !itemDisabled ? 'button' : 'div';

          return (
            <Component
              key={item.id}
              className={[styles.item, itemDisabled ? styles.itemDisabled : ''].filter(Boolean).join(' ')}
              onClick={itemDisabled ? undefined : item.onClick}
              type={Component === 'button' ? 'button' : undefined}
              data-onestep-topbar-item={item.id}
              aria-label={typeof item.label === 'string' ? item.label : undefined}
              aria-disabled={itemDisabled || undefined}
            >
              <span className={styles.iconBox} aria-hidden="true">
                {item.icon ?? (
                  <span className={styles.iconGlyph}>
                    {DEFAULT_GLYPHS[item.id] ?? (typeof item.label === 'string' ? item.label.slice(0, 1) : '')}
                  </span>
                )}
              </span>
              <span className={styles.labelGroup}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.arrow} aria-hidden="true" />
              </span>
            </Component>
          );
        })}
      </div>
      <span className={styles.dimSpace} aria-hidden="true" />
    </div>
  );
};
