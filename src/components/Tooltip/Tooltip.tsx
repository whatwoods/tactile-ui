import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: Side;
  align?: Align;
  delay?: number;
  disabled?: boolean;
  className?: string;
}

const getTooltipPosition = (rect: DOMRect, side: Side, align: Align) => {
  const main = {
    top: { x: rect.left + rect.width / 2, y: rect.top },
    right: { x: rect.right, y: rect.top + rect.height / 2 },
    bottom: { x: rect.left + rect.width / 2, y: rect.bottom },
    left: { x: rect.left, y: rect.top + rect.height / 2 },
  }[side];

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') main.x = rect.left;
    if (align === 'end') main.x = rect.right;
  } else {
    if (align === 'start') main.y = rect.top;
    if (align === 'end') main.y = rect.bottom;
  }

  return main;
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delay = 500,
  disabled = false,
  className = '',
}) => {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const show = (immediate = false) => {
    if (disabled) return;
    clearTimer();
    const openTooltip = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPosition(getTooltipPosition(rect, side, align));
      setOpen(true);
    };
    if (immediate) {
      openTooltip();
    } else {
      timerRef.current = window.setTimeout(openTooltip, delay);
    }
  };

  const hide = useCallback(() => {
    clearTimer();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPosition(getTooltipPosition(rect, side, align));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [align, hide, open, side]);

  useEffect(() => clearTimer, []);

  return (
    <>
      <span
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={() => show()}
        onMouseLeave={hide}
        onFocus={() => show(true)}
        onBlur={hide}
        aria-describedby={open ? tooltipId : undefined}
      >
        {children}
      </span>
      {open && createPortal(
        <div
          id={tooltipId}
          role="tooltip"
          className={[styles.tooltip, styles[side], styles[align], className].filter(Boolean).join(' ')}
          style={{ left: position.x, top: position.y }}
        >
          {content}
          <span className={styles.arrow} aria-hidden="true" />
        </div>,
        document.body,
      )}
    </>
  );
};
