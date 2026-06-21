import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popover.module.css';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

export interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: Side;
  align?: Align;
  modal?: boolean;
  className?: string;
}

const getPosition = (rect: DOMRect, side: Side, align: Align) => {
  const point = {
    top: { x: rect.left + rect.width / 2, y: rect.top },
    right: { x: rect.right, y: rect.top + rect.height / 2 },
    bottom: { x: rect.left + rect.width / 2, y: rect.bottom },
    left: { x: rect.left, y: rect.top + rect.height / 2 },
  }[side];

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') point.x = rect.left;
    if (align === 'end') point.x = rect.right;
  } else {
    if (align === 'start') point.y = rect.top;
    if (align === 'end') point.y = rect.bottom;
  }

  return point;
};

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  modal = false,
  className = '',
}) => {
  const popoverId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback((nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setPosition(getPosition(rect, side, align));
  }, [align, side]);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, setOpen, updatePosition]);

  const triggerElement = trigger as React.ReactElement<React.HTMLAttributes<HTMLElement> & React.AriaAttributes>;
  const triggerProps = triggerElement.props;
  const clonedTrigger = React.cloneElement(triggerElement, {
    'aria-controls': isOpen ? popoverId : undefined,
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      triggerProps.onClick?.(event);
      setOpen(!isOpen);
    },
  });

  return (
    <>
      <span ref={triggerRef} className={styles.trigger}>
        {clonedTrigger}
      </span>
      {isOpen && createPortal(
        <>
          {modal && <div className={styles.scrim} aria-hidden="true" />}
          <div
            id={popoverId}
            ref={contentRef}
            role="dialog"
            className={[styles.content, styles[side], styles[align], className].filter(Boolean).join(' ')}
            style={{ left: position.x, top: position.y }}
          >
            {children}
            <span className={styles.arrow} aria-hidden="true" />
          </div>
        </>,
        document.body,
      )}
    </>
  );
};
