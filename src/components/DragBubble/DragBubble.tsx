import React from 'react';
import styles from './DragBubble.module.css';

export interface DragBubbleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'float' | 'preview';
  side?: 'left' | 'right';
  className?: string;
}

export const DragBubble: React.FC<DragBubbleProps> = ({
  children,
  icon,
  variant = 'float',
  side = 'right',
  className = '',
}) => {
  const rootClass = [
    styles.dragBubble,
    styles[variant],
    styles[side],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className={styles.label}>{children}</div>
      {variant === 'preview' && (
        <div className={styles.iconSlot} aria-hidden={!icon}>
          {icon || <span className={styles.iconFallback}>T</span>}
        </div>
      )}
    </div>
  );
};
