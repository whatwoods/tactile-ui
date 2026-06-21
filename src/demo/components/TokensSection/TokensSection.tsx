import React, { useState } from 'react';
import styles from './TokensSection.module.css';
import { Switch } from '../../../components/Switch/Switch';

export const TokensSection: React.FC = () => {
  const [isDemoBoxActive, setIsDemoBoxActive] = useState(false);

  const colors = [
    { label: '主色 (Primary)', token: '--s-color-primary', bg: 'var(--s-color-primary)', border: 'none' },
    { label: '背景色 (Background)', token: '--s-color-bg', bg: 'var(--s-color-bg)', border: '1px solid var(--s-color-border)' },
    { label: '卡片面板 (Surface)', token: '--s-color-surface', bg: 'var(--s-color-surface)', border: '1px solid var(--s-color-border)' },
    { label: '文本主色 (Text Primary)', token: '--s-color-text-primary', bg: 'var(--s-color-text-primary)', border: 'none' },
    { label: '警示红色 (Danger)', token: '--s-color-danger', bg: 'var(--s-color-danger)', border: 'none' },
    { label: '成功绿色 (Success)', token: '--s-color-success', bg: 'var(--s-color-success)', border: 'none' }
  ];

  const shadows = [
    { label: '浮雕卡片阴影', desc: 'Panel Shadow', token: '--s-shadow-panel', shadow: 'var(--s-shadow-panel)' },
    { label: '物理按压阴影', desc: 'Pressed Inset', token: '--s-shadow-pressed', shadow: 'var(--s-shadow-pressed)' },
    { label: '滑动凹槽阴影', desc: 'Inset Groove', token: '--s-shadow-inset-groove', shadow: 'var(--s-shadow-inset-groove)' },
    { label: '基础投影', desc: 'Drop Shadow', token: '--s-shadow-drop', shadow: 'var(--s-shadow-drop)' }
  ];

  const typography = [
    { label: '标题栏 (TitleBar)', token: '--s-font-size-titlebar', size: '20px', className: styles.fontTitleBar },
    { label: '设置标题 (Setting Title)', token: '--s-font-size-setting-title', size: '18px', className: styles.fontSettingTitle },
    { label: '正文 (Body)', token: '--s-font-size-body', size: '16px', className: styles.fontBody },
    { label: '强调正文 (Emphasis)', token: '--s-font-size-emphasis', size: '15px', className: styles.fontEmphasis },
    { label: '次正文 (Body SM)', token: '--s-font-size-body-sm', size: '14px', className: styles.fontBodySm },
    { label: '辅助说明 (Caption)', token: '--s-font-size-caption', size: '12px', className: styles.fontCaption }
  ];

  const radii = [
    { label: '极小 (XS)', val: '4px', token: '--s-radius-xs', radius: 'var(--s-radius-xs)' },
    { label: '普通小 (SM)', val: '6px', token: '--s-radius-sm', radius: 'var(--s-radius-sm)' },
    { label: '中等 (MD)', val: '8px', token: '--s-radius-md', radius: 'var(--s-radius-md)' },
    { label: '大 (LG)', val: '12px', token: '--s-radius-lg', radius: 'var(--s-radius-lg)' },
    { label: '极大 (XL)', val: '16px', token: '--s-radius-xl', radius: 'var(--s-radius-xl)' },
    { label: '胶囊 (Pill)', val: '9999px', token: '--s-radius-pill', radius: 'var(--s-radius-pill)' }
  ];

  return (
    <section id="tokens-section" className={styles.tokensSection}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>设计令牌 — 秩序的代价与回报</h3>
          <p className={styles.sectionSubtitle}>
            颜色、阴影、间距、圆角、时长、缓动曲线——全部收敛在一份 tokens.css 中，不允许硬编码，不允许例外。这不是洁癖，这是让 AI Coding Agent 也能精准生成属于这个系统的界面的唯一方法。
          </p>
        </div>

        <div className={styles.gridContainer}>
          {/* Spec Group 1: Colors */}
          <div className={styles.tokenGroup}>
            <h4 className={styles.groupTitle}>配色板 (Colors)</h4>
            <div className={styles.colorsGrid}>
              {colors.map((color) => (
                <div key={color.token} className={styles.colorCard}>
                  <div 
                    className={styles.colorSwatch} 
                    style={{ background: color.bg, border: color.border }}
                  />
                  <div className={styles.tokenInfo}>
                    <span className={styles.tokenLabel}>{color.label}</span>
                    <code className={styles.tokenCode}>{color.token}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec Group 2: Shadows */}
          <div className={styles.tokenGroup}>
            <h4 className={styles.groupTitle}>物理光影令牌 (Shadows & Depth)</h4>
            <div className={styles.shadowsGrid}>
              {shadows.map((shadow) => (
                <div key={shadow.token} className={styles.shadowCard}>
                  <div 
                    className={styles.shadowDisplay} 
                    style={{ boxShadow: shadow.shadow }}
                  >
                    <span>示例文本</span>
                  </div>
                  <div className={styles.tokenInfo}>
                    <span className={styles.tokenLabel}>{shadow.label} ({shadow.desc})</span>
                    <code className={styles.tokenCode}>{shadow.token}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec Group 3: Typography */}
          <div className={styles.tokenGroup}>
            <h4 className={styles.groupTitle}>字号系统 (Typography)</h4>
            <div className={styles.listContainer}>
              {typography.map((font) => (
                <div key={font.token} className={styles.listItem}>
                  <div className={styles.typographyPreview}>
                    <span className={font.className}>用秩序建立系统，用触感表达交互</span>
                  </div>
                  <div className={styles.tokenInfoRight}>
                    <span className={styles.tokenLabel}>{font.label}</span>
                    <code className={styles.tokenCode}>{font.token} ({font.size})</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec Group 4: Border Radii */}
          <div className={styles.tokenGroup}>
            <h4 className={styles.groupTitle}>圆角系统 (Border Radii)</h4>
            <div className={styles.radiiGrid}>
              {radii.map((radius) => (
                <div key={radius.token} className={styles.radiusCard}>
                  <div 
                    className={styles.radiusBox} 
                    style={{ borderRadius: radius.radius }}
                  />
                  <div className={styles.tokenInfo}>
                    <span className={styles.tokenLabel}>{radius.label}</span>
                    <code className={styles.tokenCode}>{radius.token} ({radius.val})</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spec Group 5: Physics Transitions */}
          <div className={`${styles.tokenGroup} ${styles.fullWidthGroup}`}>
            <h4 className={styles.groupTitle}>物理感过渡动效 (Physics & Transitions)</h4>
            <div className={styles.transitionsShowcase}>
              <div className={styles.interactiveArea}>
                <div className={styles.demoSwitchControl}>
                  <Switch
                    size="md"
                    checked={isDemoBoxActive}
                    onChange={setIsDemoBoxActive}
                  />
                </div>
              </div>
              <div className={styles.transitionTokenDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailName}>阻尼滑移过渡:</span>
                  <code className={styles.detailCode}>--s-duration-slower</code>
                  <span className={styles.detailDesc}>420ms，用于较重的控件位移，形成克制稳定的物理惯性</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailName}>阻尼曲线:</span>
                  <code className={styles.detailCode}>cubic-bezier</code>
                  <span className={styles.detailDesc}>cubic-bezier(0.22, 0.61, 0.36, 1)，收敛克制，不做夸张回弹</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
