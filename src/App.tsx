import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ShowcaseSection } from './components/ShowcaseSection/ShowcaseSection';
import { ComponentGallery } from './components/ComponentGallery/ComponentGallery';
import { TokensSection } from './components/TokensSection/TokensSection';
import { SideNav } from './components/SideNav/SideNav';
import { Footer } from './components/Footer/Footer';
import { ToastProvider } from './components/Toast/Toast';

const SIDE_NAV_ITEMS = [
  {
    id: 'hero-section',
    label: '系统介绍',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: 'showcase-section',
    label: '场景演示',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M21 12H3M12 3v18" />
      </svg>
    )
  },
  {
    id: 'gallery-section',
    label: '组件详览',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    )
  },
  {
    id: 'tokens-section',
    label: '设计令牌',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
];

function App() {
  const [isMute, setIsMute] = useState(true);

  return (
    <ToastProvider>
      <div style={{ background: 'var(--s-color-surface-flat)', position: 'relative' }}>
        {/* 1. Header (double-level sticky menu) */}
        <Header />

        {/* 2. Hero Section (device + intro) */}
        <Hero />

        {/* 3. Showcase Section (immersive scenarios) */}
        <ShowcaseSection 
          isMute={isMute}
          setIsMute={setIsMute}
        />

        {/* 4. Component Gallery (accordion view) */}
        <ComponentGallery />

        {/* 5. Tokens Showcase Section */}
        <TokensSection />

        {/* 6. Footer */}
        <Footer />

        {/* 7. Side Floating Dot Navigation */}
        <SideNav
          items={SIDE_NAV_ITEMS}
          onGithubClick={() => {
            window.open('https://github.com/SmartisanTech/android_frameworks_smartisanos-base', '_blank');
          }}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
