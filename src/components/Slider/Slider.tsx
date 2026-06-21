import React, { useState, useRef } from 'react';
import styles from './Slider.module.css';

export interface SliderMark {
  value: number;
  label: string;
}

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  fillColor?: 'blue' | 'grey' | 'none';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  marks?: SliderMark[];
  ariaLabel?: string;
  getAriaValueText?: (value: number) => string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  disabled = false,
  fillColor = 'blue',
  iconLeft,
  iconRight,
  marks,
  ariaLabel = 'Slider',
  getAriaValueText,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const rawValue = isControlled ? value : internalValue;
  const range = Math.max(max - min, 0);
  const isStepped = Array.isArray(marks) && marks.length > 0;
  const sortedMarks = isStepped ? [...marks].sort((a, b) => a.value - b.value) : [];

  const normalizeValue = (nextValue: number) => {
    const clamped = Math.min(max, Math.max(min, nextValue));
    if (isStepped && sortedMarks.length > 0) {
      return sortedMarks.reduce((prev, curr) =>
        Math.abs(curr.value - clamped) < Math.abs(prev.value - clamped) ? curr : prev
      ).value;
    }
    const safeStep = step > 0 ? step : 1;
    const stepped = Math.round((clamped - min) / safeStep) * safeStep + min;
    const precision = `${safeStep}`.split('.')[1]?.length ?? 0;
    return Number(Math.min(max, Math.max(min, stepped)).toFixed(precision));
  };

  const currentValue = normalizeValue(rawValue);
  const percentage = range === 0 ? 0 : Math.min(Math.max(((currentValue - min) / range) * 100, 0), 100);

  const commitValue = (nextValue: number) => {
    if (disabled) return;
    const normalized = normalizeValue(nextValue);
    if (!isControlled) {
      setInternalValue(normalized);
    }
    onChange?.(normalized);
  };

  const updateValueFromEvent = (clientX: number) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newPercentage = ((clientX - rect.left) / rect.width);
    newPercentage = Math.max(0, Math.min(1, newPercentage));
    commitValue(newPercentage * range + min);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.currentTarget.focus();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateValueFromEvent(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !e.buttons) return;
    updateValueFromEvent(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (!disabled) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe check
      }
    }
  };

  const moveToAdjacentMark = (direction: -1 | 1) => {
    if (sortedMarks.length === 0) return;
    const currentIndex = sortedMarks.findIndex((mark) => mark.value === currentValue);
    const safeIndex = currentIndex >= 0
      ? currentIndex
      : sortedMarks.findIndex((mark) => mark.value >= currentValue);
    const fallbackIndex = direction === 1 ? 0 : sortedMarks.length - 1;
    const baseIndex = safeIndex >= 0 ? safeIndex : fallbackIndex;
    const nextIndex = Math.min(sortedMarks.length - 1, Math.max(0, baseIndex + direction));
    commitValue(sortedMarks[nextIndex].value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    const largeStep = Math.max(step * 10, range / 10);
    const keyHandlers: Record<string, () => void> = {
      ArrowLeft: () => isStepped ? moveToAdjacentMark(-1) : commitValue(currentValue - step),
      ArrowDown: () => isStepped ? moveToAdjacentMark(-1) : commitValue(currentValue - step),
      ArrowRight: () => isStepped ? moveToAdjacentMark(1) : commitValue(currentValue + step),
      ArrowUp: () => isStepped ? moveToAdjacentMark(1) : commitValue(currentValue + step),
      PageDown: () => commitValue(currentValue - largeStep),
      PageUp: () => commitValue(currentValue + largeStep),
      Home: () => commitValue(min),
      End: () => commitValue(max),
    };

    const handler = keyHandlers[event.key];
    if (!handler) return;
    event.preventDefault();
    handler();
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''} ${isDragging ? styles.dragging : ''} ${className}`.trim()}>
      {/* Stepped labels (above the track) */}
      {isStepped && (
        <div className={styles.marksContainer}>
          {sortedMarks.map((mark) => {
            const markPercentage = range === 0 ? 0 : ((mark.value - min) / range) * 100;
            const isActive = mark.value === currentValue;
            return (
              <button
                type="button"
                key={mark.value} 
                className={`${styles.markLabel} ${isActive ? styles.markLabelActive : ''}`}
                style={{ left: `${markPercentage}%` }}
                onClick={() => commitValue(mark.value)}
                disabled={disabled}
                aria-pressed={isActive}
              >
                {mark.label}
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.controlArea}>
        {iconLeft && <div className={styles.icon}>{iconLeft}</div>}
        
        <div 
          className={styles.slider}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          ref={trackRef}
          role="slider"
          tabIndex={disabled ? undefined : 0}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={getAriaValueText?.(currentValue)}
        >
          <div className={styles.track}>
            <div className={`${styles.fill} ${styles[`fill-${fillColor}`]}`} style={{ width: `${percentage}%` }}></div>
            
            {/* Stepped Nodes on the track */}
            {isStepped && sortedMarks.map((mark) => {
              const markPercentage = range === 0 ? 0 : ((mark.value - min) / range) * 100;
              return (
                <div 
                  key={mark.value}
                  className={styles.trackNode}
                  style={{ left: `${markPercentage}%` }}
                ></div>
              );
            })}

            {/* Thumb is placed inside the track to position relative to the track bounds */}
            <div className={styles.thumb} style={{ left: `${percentage}%` }}>
              <div className={isStepped ? styles.thumbDot : styles.thumbDimple}></div>
            </div>
          </div>
        </div>

        {iconRight && <div className={styles.icon}>{iconRight}</div>}
      </div>
    </div>
  );
};
