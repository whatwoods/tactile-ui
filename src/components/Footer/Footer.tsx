import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          {/* Logo & Manifesto */}
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <svg viewBox="0 0 38 38" width="32" height="32" className={styles.hammerLogo}>
                <circle cx="19" cy="19" r="17.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <rect x="18" y="15" width="2" height="14" rx="0.5" fill="currentColor" />
                <path d="M12 11.2c0.8-0.8 3.2-1.2 5-1.2v2.8c-1.5 0-3.8-0.4-5-1.6z" fill="currentColor" />
                <rect x="17" y="10" width="7" height="2.8" rx="0.4" fill="currentColor" />
                <rect x="17.5" y="11.5" width="3" height="4.5" fill="currentColor" />
              </svg>
              <span className={styles.logoText}>smartisan ui</span>
            </div>
            <p className={styles.tagline}>
              扁平的信息结构 + 拟物的交互暗示 + 克制的材质表现
            </p>
          </div>

          {/* Links columns */}
          <div className={styles.linksGrid}>
            <div className={styles.linksColumn}>
              <h5 className={styles.columnHeader}>官方资源</h5>
              <a 
                href="https://github.com/SmartisanTech/android_frameworks_smartisanos-base" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link}
              >
                Smartisan OS 开源仓库
              </a>
            </div>

            <div className={styles.linksColumn}>
              <h5 className={styles.columnHeader}>设计系统</h5>
              <a 
                href="file:///Users/way/Developer/webs/smartisan-ui/DESIGN.md" 
                className={styles.link}
              >
                视觉与设计原则
              </a>
              <a 
                href="#tokens-section" 
                className={styles.link}
              >
                全局设计令牌
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            <span>© {currentYear} Tactile UI. Inspired by Smartisan OS.</span>
          </div>
          <div className={styles.author}>
            <span>Designed by </span>
            <a 
              href="https://github.com/way" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.authorLink}
            >
              @way
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
