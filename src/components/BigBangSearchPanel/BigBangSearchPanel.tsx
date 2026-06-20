import React, { useState } from 'react';
import styles from './BigBangSearchPanel.module.css';

export type BigBangSearchMode = 'web' | 'dict' | 'wiki';

export interface BigBangSearchModeOption {
  value: BigBangSearchMode;
  label: string;
  icon: React.ReactNode;
}

export interface BigBangSearchPanelProps {
  title: React.ReactNode;
  query?: React.ReactNode;
  modes?: BigBangSearchModeOption[];
  activeMode?: BigBangSearchMode;
  defaultActiveMode?: BigBangSearchMode;
  loading?: boolean;
  canGoBack?: boolean;
  onModeChange?: (mode: BigBangSearchMode) => void;
  onBack?: () => void;
  onOpenBrowser?: () => void;
  onSettings?: () => void;
  className?: string;
}

const DEFAULT_MODES: BigBangSearchModeOption[] = [
  { value: 'web', label: '网页搜索', icon: 'S' },
  { value: 'dict', label: '词典', icon: 'D' },
  { value: 'wiki', label: '百科', icon: 'W' },
];

const MODE_OFFSETS: Record<BigBangSearchMode, number> = {
  web: -44,
  dict: 0,
  wiki: 44,
};

export const BigBangSearchPanel: React.FC<BigBangSearchPanelProps> = ({
  title,
  query,
  modes = DEFAULT_MODES,
  activeMode,
  defaultActiveMode = 'dict',
  loading = false,
  canGoBack = false,
  onModeChange,
  onBack,
  onOpenBrowser,
  onSettings,
  className = '',
}) => {
  const [internalMode, setInternalMode] = useState(defaultActiveMode);
  const isControlled = activeMode !== undefined;
  const currentMode = isControlled ? activeMode : internalMode;
  const rootClass = [styles.panel, className].filter(Boolean).join(' ');
  const activeOffset = MODE_OFFSETS[currentMode] || 0;

  const style = {
    '--bigbang-search-progress-offset': `${activeOffset}px`,
  } as React.CSSProperties;

  const handleModeChange = (mode: BigBangSearchMode) => {
    if (!isControlled) {
      setInternalMode(mode);
    }
    onModeChange?.(mode);
  };

  return (
    <section className={rootClass} style={style} aria-label="BigBang 搜索窗口">
      <div className={styles.webview} aria-hidden="true">
        <div className={styles.resultHeader}>
          <span className={styles.resultKicker}>BigBang</span>
          <strong>{query || title}</strong>
        </div>
        <div className={styles.resultLineWide} />
        <div className={styles.resultLine} />
        <div className={styles.resultBlock}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.chrome}>
        <header className={styles.topPanel}>
          <h3 className={styles.title}>{title}</h3>
          <button type="button" className={styles.browserButton} onClick={onOpenBrowser} aria-label="在浏览器中打开">
            <svg className={styles.browserIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 3H3.8A1.8 1.8 0 0 0 2 4.8v9.4A1.8 1.8 0 0 0 3.8 16h9.4a1.8 1.8 0 0 0 1.8-1.8V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M10 2h6v6M8.5 9.5 15.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </header>

        <footer className={styles.bottomPanel}>
          <button
            type="button"
            className={styles.backButton}
            disabled={!canGoBack}
            onClick={onBack}
            aria-label="返回上一页"
          >
            <svg className={styles.actionIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4 6 9l5 5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`${styles.searchSwitcher} ${loading ? styles.searchSwitcherLoading : ''}`}>
            {loading && <span className={styles.loadingSpinner} aria-hidden="true" />}
            <div className={styles.modeGroup} role="radiogroup" aria-label="搜索来源">
              {modes.map((mode) => {
                const selected = currentMode === mode.value;

                return (
                  <button
                    key={mode.value}
                    type="button"
                    className={`${styles.modeButton} ${selected ? styles.modeButtonSelected : ''}`}
                    role="radio"
                    aria-checked={selected}
                    aria-label={mode.label}
                    onClick={() => handleModeChange(mode.value)}
                  >
                    {mode.icon}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="button" className={styles.settingsButton} onClick={onSettings} aria-label="BigBang 设置">
            <svg className={styles.actionIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 6.2A2.8 2.8 0 1 1 9 11.8 2.8 2.8 0 0 1 9 6.2Z" stroke="currentColor" strokeWidth="1.7" />
              <path d="M14.8 9c0-.4-.04-.78-.12-1.15l1.36-1.05-1.36-2.35-1.6.66a6.2 6.2 0 0 0-1.98-1.14L10.86 2H8.14L7.9 3.97a6.2 6.2 0 0 0-1.98 1.14l-1.6-.66L2.96 6.8l1.36 1.05A5.7 5.7 0 0 0 4.2 9c0 .4.04.78.12 1.15L2.96 11.2l1.36 2.35 1.6-.66A6.2 6.2 0 0 0 7.9 14.03L8.14 16h2.72l.24-1.97a6.2 6.2 0 0 0 1.98-1.14l1.6.66 1.36-2.35-1.36-1.05c.08-.37.12-.75.12-1.15Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </button>
        </footer>
      </div>
    </section>
  );
};
