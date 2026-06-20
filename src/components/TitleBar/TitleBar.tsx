import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './TitleBar.module.css';

export interface TitleBarProps {
  title: React.ReactNode;
  backLabel?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  onBack?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  className?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  backLabel = '返回',
  confirmLabel,
  onBack,
  onConfirm,
  confirmDisabled = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [alignMode, setAlignMode] = useState<'center' | 'left'>('center');
  const [paddingLeft, setPaddingLeft] = useState<number | undefined>(undefined);
  const [paddingRight, setPaddingRight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const backBtn = backBtnRef.current;
    const confirmBtn = confirmBtnRef.current;
    const titleEl = titleRef.current;

    if (!container || !titleEl) return;

    // Get actual width of buttons
    const backWidth = backBtn ? backBtn.getBoundingClientRect().width : 0;
    const confirmWidth = confirmBtn ? confirmBtn.getBoundingClientRect().width : 0;
    
    const titleWidth = titleEl.scrollWidth;
    const containerWidth = container.getBoundingClientRect().width;

    // Center area width: screenWidth - 2 * max(backBtnWidth, okBtnWidth)
    const maxBtnWidth = Math.max(backWidth, confirmWidth);
    const midWidth = containerWidth - maxBtnWidth * 2;

    if (midWidth > titleWidth + 10) {
      setAlignMode('center');
      setPaddingLeft(undefined);
      setPaddingRight(undefined);
    } else {
      setAlignMode('left');
      // Left padding must clear back button
      setPaddingLeft(backWidth > 0 ? backWidth + 16 : 16);
      // Right padding must clear confirm button or right edge gap
      const placeholderWidth = confirmWidth > 0 ? confirmWidth : 12;
      setPaddingRight(placeholderWidth + 16);
    }
  }, [title, backLabel, confirmLabel, onBack, onConfirm]);

  const titleStyle: React.CSSProperties = {};
  if (alignMode === 'left') {
    titleStyle.paddingLeft = paddingLeft !== undefined ? `${paddingLeft}px` : undefined;
    titleStyle.paddingRight = paddingRight !== undefined ? `${paddingRight}px` : undefined;
  }

  return (
    <div ref={containerRef} className={`${styles.titleBar} ${className}`.trim()}>
      <div className={styles.sideSlot}>
        {onBack && (
          <button ref={backBtnRef} className={styles.backButton} type="button" onClick={onBack}>
            <svg className={styles.backIcon} viewBox="0 0 8 14" fill="none" aria-hidden="true">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.buttonText}>{backLabel}</span>
          </button>
        )}
      </div>

      <h2
        ref={titleRef}
        className={`${styles.title} ${alignMode === 'left' ? styles.titleLeft : styles.titleCenter}`}
        style={titleStyle}
      >
        {title}
      </h2>

      <div className={`${styles.sideSlot} ${styles.rightSlot}`}>
        {confirmLabel && (
          <button
            ref={confirmBtnRef}
            className={styles.confirmButton}
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            <span className={styles.buttonText}>{confirmLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

