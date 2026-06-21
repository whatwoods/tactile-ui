import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Unified scroll spy hook calls
  const mainActiveId = useScrollSpy(['hero-section', 'showcase-section', 'gallery-section', 'tokens-section'], 150);
  const subActiveId = useScrollSpy(['hero-section', 'settings-scene', 'form-scene', 'feedback-scene'], 150);

  // Map spied active IDs to UI states
  const activeSection = 
    mainActiveId === 'tokens-section' ? 'tokens' : 
    mainActiveId === 'gallery-section' ? 'gallery' :
    mainActiveId === 'showcase-section' ? 'showcase' : 'hero';

  const activeSubItem = 
    subActiveId === 'settings-scene' ? '系统控制' :
    subActiveId === 'form-scene' ? '拟物表单' :
    subActiveId === 'feedback-scene' ? '反馈对话' : '拟物原则';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mainNavItems = [
    { label: '设计原则', id: 'hero-section', section: 'hero' },
    { label: '场景演示', id: 'showcase-section', section: 'showcase' },
    { label: '组件详览', id: 'gallery-section', section: 'gallery' },
    { label: '设计令牌', id: 'tokens-section', section: 'tokens' }
  ];

  const subNavItems = [
    { label: '拟物原则', targetId: 'hero-section' },
    { label: '系统控制', targetId: 'settings-scene' },
    { label: '拟物表单', targetId: 'form-scene' },
    { label: '反馈对话', targetId: 'feedback-scene' }
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    window.dispatchEvent(new CustomEvent('smartisan-scroll-start'));

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 120; // size of sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const handleScrollEnd = () => {
        window.dispatchEvent(new CustomEvent('smartisan-scroll-end'));
        window.removeEventListener('scrollend', handleScrollEnd);
      };
      window.addEventListener('scrollend', handleScrollEnd);

      // Fallback
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('smartisan-scroll-end'));
      }, 1000);

      // Highlight target card with breathing glow animation
      if (targetId !== 'hero-section' && targetId !== 'tokens-section') {
        element.classList.add('flash-glow-effect');
        setTimeout(() => {
          element.classList.remove('flash-glow-effect');
        }, 1200);
      }
    }
  };

  return (
    <div className={styles.headerContainer}>
      {/* 1. Main Navigation Bar (Level 1) */}
      <header className={styles.mainHeader}>
        <div className={styles.mainNavContent}>
          {/* Logo on the left */}
          <div className={styles.logoWrapper} onClick={(e) => handleNavClick(e, 'hero-section')}>
            <svg viewBox="0 0 38 38" width="38" height="38" className={styles.hammerLogo}>
              <circle cx="19" cy="19" r="17.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <rect x="18" y="15" width="2" height="14" rx="0.5" fill="currentColor" />
              <path d="M12 11.2c0.8-0.8 3.2-1.2 5-1.2v2.8c-1.5 0-3.8-0.4-5-1.6z" fill="currentColor" />
              <rect x="17" y="10" width="7" height="2.8" rx="0.4" fill="currentColor" />
              <rect x="17.5" y="11.5" width="3" height="4.5" fill="currentColor" />
            </svg>
          </div>

          {/* Links centered */}
          <nav className={styles.mainNavLinks}>
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                className={`${styles.mainLink} ${activeSection === item.section ? styles.mainLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="file:///Users/way/Developer/webs/smartisan-ui/DESIGN.md"
              className={styles.mainLink}
            >
              组件库规范
            </a>
          </nav>

          {/* Author's Personal Homepage icon on the right */}
          <div className={styles.rightActions}>
            <span className={styles.divider}></span>
            <button 
              className={styles.iconButton} 
              aria-label="Author's personal homepage" 
              onClick={() => window.open('https://github.com/way', '_blank')}
              title="作者个人主页"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub Navigation Bar (Level 2 - sticky) */}
      <div className={`${styles.subHeader} ${isSticky ? styles.sticky : ''}`}>
        <div className={styles.subNavContent}>
          {/* Logo container for the sticky state (Tactile UI) */}
          <div className={`${styles.stickyLogo} ${isSticky ? styles.visible : ''}`} onClick={(e) => handleNavClick(e, 'hero-section')}>
            <span>Tactile UI</span>
          </div>

          {/* Sub Nav Links */}
          <nav className={`${styles.subNavLinks} ${isSticky ? styles.shifted : ''}`}>
            {subNavItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.targetId}`}
                className={`${styles.subLink} ${activeSubItem === item.label ? styles.subLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
