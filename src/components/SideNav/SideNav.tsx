import React, { useState, useEffect, useRef } from 'react';
import styles from './SideNav.module.css';

export interface SideNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SideNavProps {
  items: SideNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  onGithubClick?: () => void;
}

// High-fidelity GitHub logo path
const GithubIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const SideNav: React.FC<SideNavProps> = ({ items, activeId, onChange, onGithubClick }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Skip active state updates on scroll if we are in a programmatic smooth scroll
      if (isProgrammaticScrollRef.current) return;

      // Use innerHeight / 2 to align perfectly with Header.tsx tracking logic
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
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

    const handleScrollEndNative = () => {
      isProgrammaticScrollRef.current = false;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    const handleScrollEndCustom = () => {
      isProgrammaticScrollRef.current = false;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    const handleScrollStartCustom = () => {
      isProgrammaticScrollRef.current = true;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollEndNative);
    window.addEventListener('smartisan-scroll-start', handleScrollStartCustom);
    window.addEventListener('smartisan-scroll-end', handleScrollEndCustom);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEndNative);
      window.removeEventListener('smartisan-scroll-start', handleScrollStartCustom);
      window.removeEventListener('smartisan-scroll-end', handleScrollEndCustom);
    };
  }, [items, onChange]);

  const handleDotClick = (id: string) => {
    onChange(id);

    // Set programmatic scrolling flag to temporarily disable scroll spy to prevent flicker
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    isProgrammaticScrollRef.current = true;
    window.dispatchEvent(new CustomEvent('smartisan-scroll-start'));
    
    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      window.dispatchEvent(new CustomEvent('smartisan-scroll-end'));
    }, 1000); // safety fallback

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Size of main headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.container}>
      {/* Vertical Pill panel */}
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
              {/* Inner dot with image-matched style */}
              <div className={`${styles.dot} ${isActive ? styles.active : ''}`}></div>
              
              {/* Tooltip Card (Weibo Style: [Icon] | [Text]) */}
              <div className={`${styles.tooltip} ${isHovered ? styles.showTooltip : ''}`}>
                <div className={styles.tooltipIcon}>
                  {item.icon}
                </div>
                <div className={styles.tooltipDivider}></div>
                <div className={styles.tooltipLabel}>{item.label}</div>
              </div>
            </div>
          );
        })}

        <div className={styles.divider}></div>
        
        {/* Social Link: GitHub */}
        <div 
          className={styles.dotWrapper}
          onMouseEnter={() => setHoveredId('github')}
          onMouseLeave={() => setHoveredId(null)}
          onClick={onGithubClick}
        >
          <button className={styles.socialBtn} aria-label="Smartisan UI GitHub Repository">
            <GithubIcon size={16} />
          </button>
          
          <div className={`${styles.tooltip} ${hoveredId === 'github' ? styles.showTooltip : ''}`}>
            <div className={styles.tooltipIcon}>
              <GithubIcon size={16} />
            </div>
            <div className={styles.tooltipDivider}></div>
            <div className={styles.tooltipLabel}>项目源码</div>
          </div>
        </div>
      </div>

      {/* Floating Scroll back to top (Image Style: bar on top + chevron up) */}
      <button className={styles.backToTop} onClick={handleBackToTop} aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="7" x2="18" y2="7" />
          <polyline points="6 15 12 9 18 15" />
        </svg>
      </button>
    </div>
  );
};
