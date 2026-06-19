import React, { useEffect } from 'react';
import styles from './ActionSheet.module.css';

export interface ActionSheetAction {
  label: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
}

interface ActionSheetProps {
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
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Action sheet'}
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
