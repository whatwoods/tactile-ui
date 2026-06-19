import React, { useRef, useState } from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'positive' | 'negative';
  readOnly?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'positive',
  readOnly = false,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startChecked: false,
    dragging: false,
  });

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const commitValue = (newValue: boolean) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  const handleToggle = () => {
    commitValue(!isChecked);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startChecked: isChecked,
      dragging: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || dragRef.current.pointerId !== event.pointerId) return;
    const travel = event.currentTarget.offsetWidth - parseFloat(getComputedStyle(event.currentTarget).getPropertyValue('--switch-thumb-size'));
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 3) {
      dragRef.current.dragging = true;
    }
    if (!dragRef.current.dragging || travel <= 0) return;

    const start = dragRef.current.startChecked ? 1 : 0;
    const nextProgress = Math.max(0, Math.min(1, start + delta / travel));
    setDragProgress(nextProgress);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || dragRef.current.pointerId !== event.pointerId) return;
    const wasDragging = dragRef.current.dragging;
    const nextValue = wasDragging ? (dragProgress ?? (isChecked ? 1 : 0)) >= 0.5 : !isChecked;

    dragRef.current.pointerId = -1;
    dragRef.current.dragging = false;
    setDragProgress(null);
    suppressClickRef.current = true;
    event.currentTarget.releasePointerCapture(event.pointerId);
    commitValue(nextValue);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.pointerId = -1;
      dragRef.current.dragging = false;
      setDragProgress(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    handleToggle();
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    handleToggle();
  };

  const progress = dragProgress ?? (isChecked ? 1 : 0);

  if (readOnly) {
    return (
      <div
        className={`${styles.switch} ${isChecked ? styles.checked : ''} ${styles[variant]}`}
        style={{ '--switch-progress': progress } as React.CSSProperties}
      >
        <div className={styles.track}>
          <div className={`${styles.hole} ${styles.holeLeft}`}></div>
          <div className={`${styles.hole} ${styles.holeRight}`}></div>
        </div>
        <div className={styles.thumb}>
          <div className={styles.thumbDimple}></div>
        </div>
      </div>
    );
  }

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={`${styles.switch} ${isChecked ? styles.checked : ''} ${styles[variant]}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={{ '--switch-progress': progress } as React.CSSProperties}
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
