import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook to spy on elements by ID and determine which one is currently in view.
 * It respects programmatic smooth scrolling via custom events to prevent state flickering.
 * 
 * @param ids Array of element IDs to track
 * @param offset Vertical offset from the top of the viewport to trigger change
 * @returns The active element ID
 */
export function useScrollSpy(ids: string[], offset: number = 150): string {
  const [activeId, setActiveId] = useState<string>('');
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScrollStart = () => {
      isProgrammaticScrollRef.current = true;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };

    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 100);
    };

    window.addEventListener('smartisan-scroll-start', handleScrollStart);
    window.addEventListener('smartisan-scroll-end', handleScrollEnd);
    window.addEventListener('scrollend', handleScrollEnd);

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const scrollPosition = window.scrollY + offset;

      let currentActiveId = ids[0] || '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          // If the element's top is above the offset scroll position, it's considered active
          if (el.offsetTop <= scrollPosition) {
            currentActiveId = id;
          }
        }
      }
      
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('smartisan-scroll-start', handleScrollStart);
      window.removeEventListener('smartisan-scroll-end', handleScrollEnd);
      window.removeEventListener('scrollend', handleScrollEnd);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [ids, offset]);

  return activeId;
}
