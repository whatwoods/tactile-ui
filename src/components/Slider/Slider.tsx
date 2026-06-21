import React, { useState, useRef } from 'react';
import styles from './Slider.module.css';

export interface SliderMark {
  value: number;
  label: string;
}

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  fillColor?: 'blue' | 'grey' | 'none';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  marks?: SliderMark[];
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value,
  defaultValue = 50,
  onChange,
  disabled = false,
  fillColor = 'blue',
  iconLeft,
  iconRight,
  marks
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const percentage = Math.min(Math.max(((currentValue - min) / (max - min)) * 100, 0), 100);
  const isStepped = Array.isArray(marks) && marks.length > 0;

  const updateValueFromEvent = (clientX: number) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newPercentage = ((clientX - rect.left) / rect.width);
    newPercentage = Math.max(0, Math.min(1, newPercentage));
    
    let newValue = newPercentage * (max - min) + min;
    
    if (isStepped) {
      // Find the closest mark
      const closestMark = marks.reduce((prev, curr) => 
        Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue) ? curr : prev
      );
      newValue = closestMark.value;
    } else {
      newValue = Math.round(newValue);
    }
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateValueFromEvent(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (disabled || !e.buttons) return;
    updateValueFromEvent(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (!disabled && e.target) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe check
      }
    }
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''} ${isDragging ? styles.dragging : ''}`}>
      {/* Stepped labels (above the track) */}
      {isStepped && (
        <div className={styles.marksContainer}>
          {marks.map((mark) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100;
            const isActive = mark.value === currentValue;
            return (
              <div 
                key={mark.value} 
                className={`${styles.markLabel} ${isActive ? styles.markLabelActive : ''}`}
                style={{ left: `${markPercentage}%` }}
                onClick={() => {
                  if (!disabled) {
                    if (!isControlled) setInternalValue(mark.value);
                    onChange?.(mark.value);
                  }
                }}
              >
                {mark.label}
              </div>
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
          ref={trackRef}
        >
          <div className={styles.track}>
            <div className={`${styles.fill} ${styles[`fill-${fillColor}`]}`} style={{ width: `${percentage}%` }}></div>
            
            {/* Stepped Nodes on the track */}
            {isStepped && marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
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
