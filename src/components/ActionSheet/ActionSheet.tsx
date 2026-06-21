import React, { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../utils/focusTrap';
import styles from './ActionSheet.module.css';

export interface ActionSheetAction {
  label: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
}

export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: ActionSheetAction[];
  cancelLabel?: React.ReactNode;
  cancelPosition?: 'left' | 'right';
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions = [],
  cancelLabel = '取消',
  cancelPosition = 'right',
}) => {
  const sheetRef = useRef<HTMLElement>(null);

  useFocusTrap(sheetRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActionClick = (action: ActionSheetAction) => {
    action.onClick?.();
    onClose();
  };

  const cancelButton = (
    <button type="button" className={styles.cancelButton} onClick={onClose}>
      {cancelLabel}
    </button>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        ref={sheetRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Action sheet'}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          {cancelPosition === 'left' ? cancelButton : <span className={styles.headerSpacer} aria-hidden="true" />}
          {title && <h2 className={styles.title}>{title}</h2>}
          {cancelPosition === 'right' ? cancelButton : <span className={styles.headerSpacer} aria-hidden="true" />}
        </header>

        <div className={styles.body}>
          {children && <div className={styles.content}>{children}</div>}
          {actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.action} ${styles[action.variant || 'default']}`}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
