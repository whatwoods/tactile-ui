import React, { useState, useEffect } from 'react';
import styles from './SideNav.module.css';

interface SideNavItem {
  id: string;
  label: string;
}

interface SideNavProps {
  items: SideNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  onBackToTop?: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({ items, activeId, onChange, onBackToTop }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            onChange(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, onChange]);

  const handleDotClick = (id: string) => {
    onChange(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header/padding
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pill}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isHovered = item.id === hoveredId;
          
          return (
            <div 
              key={item.id}
              className={styles.dotWrapper}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleDotClick(item.id)}
            >
              <div className={`${styles.dot} ${isActive ? styles.active : ''}`}></div>
              
              {/* Tooltip */}
              <div className={`${styles.tooltip} ${isHovered ? styles.showTooltip : ''}`}>
                <div className={styles.tooltipIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                </div>
                <div className={styles.tooltipDivider}></div>
                <div className={styles.tooltipLabel}>{item.label}</div>
              </div>
            </div>
          );
        })}

        <div className={styles.divider}></div>
        
        {/* Social Icons Placeholder */}
        <button className={styles.socialBtn} aria-label="Social link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </button>
        <button className={styles.socialBtn} aria-label="Social link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </button>
      </div>

      {onBackToTop && (
        <button className={styles.backToTop} onClick={onBackToTop} aria-label="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
      )}
    </div>
  );
};
