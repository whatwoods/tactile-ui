import React from 'react';
import styles from './OneStepItem.module.css';

export interface OneStepPanelProps {
  title: React.ReactNode;
  onClear?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface OneStepItemProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  date?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'text' | 'file' | 'bookmark' | 'more';
  onClick?: () => void;
  className?: string;
}

export const OneStepPanel: React.FC<OneStepPanelProps> = ({
  title,
  onClear,
  children,
  className = '',
}) => {
  const rootClass = [styles.panel, className].filter(Boolean).join(' ');

  return (
    <section className={rootClass} aria-label={typeof title === 'string' ? title : 'OneStep 内容列表'}>
      <header className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>{title}</h3>
        {onClear && (
          <button type="button" className={styles.clearButton} onClick={onClear} aria-label="清除内容">
            <svg className={styles.clearIcon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </header>
      <div className={styles.panelBody}>{children}</div>
    </section>
  );
};

export const OneStepItem: React.FC<OneStepItemProps> = ({
  title,
  subtitle,
  date,
  icon,
  variant = 'text',
  onClick,
  className = '',
}) => {
  const Component = onClick ? 'button' : 'div';
  const rootClass = [styles.itemWrap, className].filter(Boolean).join(' ');
  const itemClass = [
    styles.item,
    styles[variant],
    onClick ? styles.clickable : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {date && <div className={styles.dateLabel}>{date}</div>}
      <Component className={itemClass} onClick={onClick} type={onClick ? 'button' : undefined}>
        {variant === 'more' ? (
          <span className={styles.moreLabel}>{title || '加载更多'}</span>
        ) : (
          <>
            {icon && <span className={styles.iconSlot}>{icon}</span>}
            <span className={styles.copy}>
              <span className={styles.title}>{title}</span>
              {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </span>
            {variant === 'text' && (
              <span className={styles.copyIcon} aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none">
                  <rect x="3.2" y="1.2" width="6.6" height="7.6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2.2 3.4H2a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h5.6a1 1 0 0 0 1-1v-.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </>
        )}
      </Component>
    </div>
  );
};
