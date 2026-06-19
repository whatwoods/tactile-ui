import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeSubItem, setActiveSubItem] = useState('拟物原则');

  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      // Sticky header logic (always run this to keep sticky header responsive)
      if (scrollPos > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Skip active section tracking during programmatic smooth scroll
      if (isProgrammaticScrollRef.current) return;

      const windowHeight = window.innerHeight;
      
      // Main section tracking
      const playgroundEl = document.getElementById('playground-section');
      const tokensEl = document.getElementById('tokens-section');

      let currentSec = 'hero';
      if (tokensEl && scrollPos >= tokensEl.offsetTop - windowHeight / 2) {
        currentSec = 'tokens';
      } else if (playgroundEl && scrollPos >= playgroundEl.offsetTop - windowHeight / 2) {
        currentSec = 'playground';
      }
      setActiveSection(currentSec);

      // Sub nav item tracking within playground
      if (currentSec === 'playground') {
        const switchEl = document.getElementById('switch-card');
        const formEl = document.getElementById('form-card');
        const dialogEl = document.getElementById('dialog-card');
        const buffer = windowHeight / 3;

        if (dialogEl && scrollPos >= dialogEl.offsetTop - buffer) {
          // If we scroll past the dialog card, highlight SegmentedControl or Dialog
          // We'll highlight Dialog if we are lower down
          if (scrollPos >= dialogEl.offsetTop - buffer + 100) {
            setActiveSubItem('对话弹窗');
          } else {
            setActiveSubItem('分段选择');
          }
        } else if (formEl && scrollPos >= formEl.offsetTop - buffer) {
          // If we are at the form card
          if (scrollPos >= formEl.offsetTop - buffer + 120) {
            setActiveSubItem('输入框');
          } else {
            setActiveSubItem('复选框');
          }
        } else if (switchEl && scrollPos >= switchEl.offsetTop - buffer) {
          if (scrollPos >= switchEl.offsetTop - buffer + 120) {
            setActiveSubItem('滑块');
          } else {
            setActiveSubItem('开关');
          }
        }
      } else {
        setActiveSubItem('拟物原则');
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
  }, []);

  const mainNavItems = [
    { label: '设计原则', id: 'hero-section', section: 'hero' },
    { label: '组件预览', id: 'playground-section', section: 'playground' },
    { label: '设计令牌', id: 'tokens-section', section: 'tokens' }
  ];

  const subNavItems = [
    { label: '拟物原则', targetId: 'hero-section' },
    { label: '开关', targetId: 'switch-card' },
    { label: '滑块', targetId: 'switch-card' },
    { label: '复选框', targetId: 'form-card' },
    { label: '输入框', targetId: 'form-card' },
    { label: '分段选择', targetId: 'dialog-card' },
    { label: '对话弹窗', targetId: 'dialog-card' }
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string, subLabel?: string) => {
    e.preventDefault();

    // Set programmatic scroll lock to prevent scrollspy updates during smooth scrolling
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    isProgrammaticScrollRef.current = true;
    window.dispatchEvent(new CustomEvent('smartisan-scroll-start'));
    
    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      window.dispatchEvent(new CustomEvent('smartisan-scroll-end'));
    }, 1000); // safety fallback

    // Instantly set the active states to the clicked targets for instant visual feedback
    if (subLabel) {
      setActiveSubItem(subLabel);
      if (subLabel === '拟物原则') {
        setActiveSection('hero');
      } else {
        setActiveSection('playground');
      }
    } else {
      if (targetId === 'hero-section') {
        setActiveSection('hero');
        setActiveSubItem('拟物原则');
      } else if (targetId === 'playground-section') {
        setActiveSection('playground');
        setActiveSubItem('开关');
      } else if (targetId === 'tokens-section') {
        setActiveSection('tokens');
        setActiveSubItem('拟物原则');
      }
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 120; // size of sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

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
              onClick={(e) => handleNavClick(e, 'tokens-section')}
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
          {/* Logo container for the sticky state (smartisan ui) */}
          <div className={`${styles.stickyLogo} ${isSticky ? styles.visible : ''}`} onClick={(e) => handleNavClick(e, 'hero-section')}>
            <span>smartisan ui</span>
          </div>

          {/* Sub Nav Links */}
          <nav className={`${styles.subNavLinks} ${isSticky ? styles.shifted : ''}`}>
            {subNavItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.targetId}`}
                className={`${styles.subLink} ${activeSubItem === item.label ? styles.subLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, item.targetId, item.label)}
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
