import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky state when scrolled past the main header (80px)
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { label: '在线商城', active: false },
    { label: '坚果 R2', active: false },
    { label: 'Smartisan TNT go', active: false },
    { label: '坚果 TNT 工作站', active: false },
    { label: 'Smartisan OS', active: true },
    { label: '欢喜云', active: false },
    { label: '论坛', active: false },
    { label: '开发者支持', active: false },
    { label: '荣誉与奖项', active: false }
  ];

  const subNavItems = [
    { label: 'TNT', active: false },
    { label: 'OS 6.6', active: false },
    { label: 'Idea Pills', active: false },
    { label: 'Big Bang', active: false },
    { label: 'One Step', active: false },
    { label: '好用', active: false },
    { label: '好看', active: false },
    { label: '强大', active: true },
    { label: '人性化', active: false },
    { label: '丰富', active: false },
    { label: '云服务', active: false },
    { label: '开发者', active: false }
  ];

  return (
    <div className={styles.headerContainer}>
      {/* 1. Main Navigation Bar (Level 1) */}
      <header className={styles.mainHeader}>
        <div className={styles.mainNavContent}>
          {/* Logo on the left */}
          <div className={styles.logoWrapper}>
            <svg viewBox="0 0 38 38" width="38" height="38" className={styles.hammerLogo}>
              <circle cx="19" cy="19" r="17.5" stroke="#333333" strokeWidth="1.2" fill="none" />
              {/* Specialized Hammer Vector */}
              <rect x="18" y="15" width="2" height="14" rx="0.5" fill="#333333" />
              <path d="M12 11.2c0.8-0.8 3.2-1.2 5-1.2v2.8c-1.5 0-3.8-0.4-5-1.6z" fill="#333333" />
              <rect x="17" y="10" width="7" height="2.8" rx="0.4" fill="#333333" />
              <rect x="17.5" y="11.5" width="3" height="4.5" fill="#333333" />
            </svg>
          </div>

          {/* Links centered */}
          <nav className={styles.mainNavLinks}>
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`${styles.mainLink} ${item.active ? styles.mainLinkActive : ''}`}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User & Cart icons on the right */}
          <div className={styles.rightActions}>
            <span className={styles.divider}></span>
            <button className={styles.iconButton} aria-label="User profile">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="Shopping cart">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub Navigation Bar (Level 2 - sticky) */}
      <div className={`${styles.subHeader} ${isSticky ? styles.sticky : ''}`}>
        <div className={styles.subNavContent}>
          {/* Logo container for the sticky state (smartisan os) */}
          <div className={`${styles.stickyLogo} ${isSticky ? styles.visible : ''}`}>
            <span>smartisan os</span>
          </div>

          {/* Sub Nav Links */}
          <nav className={`${styles.subNavLinks} ${isSticky ? styles.shifted : ''}`}>
            {subNavItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`${styles.subLink} ${item.active ? styles.subLinkActive : ''}`}
                onClick={(e) => e.preventDefault()}
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
