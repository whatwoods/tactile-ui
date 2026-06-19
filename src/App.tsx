import { useState, useEffect } from 'react';
import { Switch } from './components/Switch/Switch';
import { Input } from './components/Input/Input';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Card } from './components/Card/Card';
import { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
import { Slider } from './components/Slider/Slider';
import { Button } from './components/Button/Button';
import { Dialog } from './components/Dialog/Dialog';
import { Header } from './components/Header/Header';
import { ActionSheet } from './components/ActionSheet/ActionSheet';
import { Chip } from './components/Chip/Chip';
import { SettingItem } from './components/SettingItem/SettingItem';
import { TitleBar } from './components/TitleBar/TitleBar';
import { ProgressDialog } from './components/ProgressDialog/ProgressDialog';
import { DragBubble } from './components/DragBubble/DragBubble';
import { BigBangOptionPopup } from './components/BigBangOptionPopup/BigBangOptionPopup';
import { BigBangSearchPanel } from './components/BigBangSearchPanel/BigBangSearchPanel';
import type { BigBangSearchMode } from './components/BigBangSearchPanel/BigBangSearchPanel';
import { OneStepItem, OneStepPanel } from './components/OneStepItem/OneStepItem';

const BIGBANG_SEARCH_OPTIONS = [
  { label: '百度', icon: '百' },
  { label: '神马搜索', icon: '神' },
  { label: '必应词典', icon: 'B' },
];

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [isBigBangOptionOpen, setIsBigBangOptionOpen] = useState(true);
  
  // Interactive Settings States
  const [isMute, setIsMute] = useState(true);
  const [stepValue, setStepValue] = useState(0);
  const [volume, setVolume] = useState(30);
  const [brightness, setBrightness] = useState(80);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('classic');
  const [titleBarSaved, setTitleBarSaved] = useState(false);
  const [selectedSearchProvider, setSelectedSearchProvider] = useState(0);
  const [bigBangSearchMode, setBigBangSearchMode] = useState<BigBangSearchMode>('dict');
  const [bigBangSearchLoading, setBigBangSearchLoading] = useState(false);

  // Active section for floating bullet navigation
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const playgroundEl = document.getElementById('playground-section');
      const tokensEl = document.getElementById('tokens-section');

      if (tokensEl && scrollPos >= tokensEl.offsetTop - windowHeight / 2) {
        setActiveSection('tokens');
      } else if (playgroundEl && scrollPos >= playgroundEl.offsetTop - windowHeight / 2) {
        setActiveSection('playground');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showProgressDialog = () => {
    setIsProgressDialogOpen(true);
    window.setTimeout(() => setIsProgressDialogOpen(false), 1400);
  };

  const handleBigBangModeChange = (mode: BigBangSearchMode) => {
    setBigBangSearchMode(mode);
    setBigBangSearchLoading(true);
    window.setTimeout(() => setBigBangSearchLoading(false), 1200);
  };

  return (
    <div style={{ minHeight: '150vh', background: 'var(--s-color-surface-flat)', position: 'relative' }}>
      
      {/* 1. Header component (double-level with sticky scroll transition) */}
      <Header />

      {/* 2. Section 1: Hero Section - Smartisan UI Introduction */}
      <section id="hero-section" className="heroSection">
        <div className="deviceContainer">
          {/* Skeuomorphic CSS Instrument Panel */}
          <div className="heroDevice">
            <div className="deviceScreen">
              <div className="deviceText">smartisan ui</div>
            </div>
            <div className="deviceControls">
              <div className="deviceDials">
                <div className="deviceDial"></div>
                <div className="deviceDial" style={{ transform: 'rotate(45deg)' }}></div>
                <div className="deviceDial" style={{ transform: 'rotate(-90deg)' }}></div>
              </div>
              <div className="deviceIndicators">
                <div className="deviceLED"></div>
                <div className="deviceSwitch"></div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="heroTitle">Smartisan UI 设计系统</h2>
        <p className="heroSubtitle">
          {`面向现代 Web 应用的精致拟物主义设计系统。
          通过细致入微的光影、物理深度、边缘高光与触觉阻尼，为用户重塑真实而饱满的交互感官。
          告别扁平的单调，回归物理世界的温暖触感与细腻质感。`}
        </p>
      </section>

      {/* 3. Section 2: Skeuomorphic Settings Playground */}
      <section 
        id="playground-section" 
        style={{ 
          padding: '80px 24px', 
          background: 'var(--s-texture-bg)', 
          borderBottom: '1px solid var(--s-color-border-soft)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 300, color: 'var(--s-color-text-primary)', marginBottom: '12px' }}>拟物组件交互演练区</h3>
            <p style={{ fontSize: '14px', color: 'var(--s-color-text-secondary)' }}>点击、拖拽并感受滑块、开关和复选框细致的光影反馈</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            
            {/* Control Panel 1: Sound Control (Switch & Sliders) */}
            <Card title="静音与阻尼滑块" padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: isMute ? '24px' : '0px',
                  padding: '0 4px'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--s-color-text-secondary)' }}>系统静音 (物理开关)</span>
                  <Switch checked={isMute} onChange={(checked) => setIsMute(checked)} />
                </div>

                {isMute ? (
                  <div style={{ 
                    paddingBottom: '24px', 
                    borderBottom: '1px solid var(--s-color-border-soft)', 
                    marginBottom: '24px' 
                  }}>
                    <Slider 
                      min={0}
                      max={4}
                      value={stepValue}
                      onChange={(val) => setStepValue(val)}
                      marks={[
                        { value: 0, label: '一直' },
                        { value: 1, label: '1小时' },
                        { value: 2, label: '2小时' },
                        { value: 3, label: '4小时' },
                        { value: 4, label: '8小时' }
                      ]}
                      fillColor="none"
                    />
                  </div>
                ) : (
                  <div style={{ borderBottom: '1px solid var(--s-color-border-soft)', margin: '24px 0' }}></div>
                )}

                <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--s-color-border-soft)', marginBottom: '24px' }}>
                  <Slider 
                    value={volume}
                    onChange={(val) => setVolume(val)}
                    fillColor={isMute ? 'grey' : 'blue'}
                    iconLeft={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scale(0.95)' }}>
                        <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
                        <line x1="11" y1="18" x2="13" y2="18" />
                        <path d="M3 8a8.5 8.5 0 0 0 0 8M1 10a11.5 11.5 0 0 0 0 4M21 8a8.5 8.5 0 0 1 0 8M23 10a11.5 11.5 0 0 1 0 4" />
                      </svg>
                    }
                    iconRight={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    }
                  />
                </div>

                <div>
                  <Slider 
                    value={brightness}
                    onChange={(val) => setBrightness(val)}
                    fillColor="blue"
                    iconLeft={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3.5"/>
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                      </svg>
                    }
                    iconRight={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5.5"/>
                        <path d="M12 1v2M12 21v2M3.22 3.22l1.42 1.42M19.36 19.36l1.42 1.42M1 12h2M21 12h2M4.64 19.36l-1.42 1.42M20.78 3.22l-1.42 1.42"/>
                      </svg>
                    }
                  />
                </div>
              </div>
            </Card>

            {/* Control Panel 2: Official Setting Items */}
            <Card title="官方设置项校准" padding="none">
              <SettingItem
                title="无线局域网"
                summary="已连接 Smartisan Studio"
                value={wifiEnabled ? '已开启' : '已关闭'}
                accessory="chevron"
                onClick={() => setWifiEnabled((enabled) => !enabled)}
              />
              <SettingItem
                title="OneStep 侧栏"
                summary="对应官方 48dp sidebar 入口节奏"
                accessory="switch"
                checked={wifiEnabled}
                onCheckedChange={setWifiEnabled}
              />
              <SettingItem
                title="经典提示音"
                summary="默认系统反馈"
                accessory="check"
                selected={selectedSound === 'classic'}
                onClick={() => setSelectedSound('classic')}
              />
              <SettingItem
                title="轻触提示音"
                summary="更短促的物理反馈"
                accessory="check"
                selected={selectedSound === 'tap'}
                onClick={() => setSelectedSound('tap')}
              />
            </Card>

            {/* Control Panel 3: Official Title Bar */}
            <Card padding="none">
              <TitleBar
                title="声音与触感"
                backLabel="返回"
                confirmLabel={titleBarSaved ? '已保存' : '完成'}
                onBack={() => setTitleBarSaved(false)}
                onConfirm={() => setTitleBarSaved(true)}
                confirmDisabled={titleBarSaved}
              />
              <SettingItem
                title="系统触感"
                summary="标题栏来自官方 Title 布局"
                value={titleBarSaved ? '已保存' : '待确认'}
                accessory="chevron"
                onClick={() => setTitleBarSaved((saved) => !saved)}
              />
              <SettingItem
                title="标题按钮字号"
                summary="13.5sp，最大宽约 101.7dp"
                value="官方校准"
                accessory="none"
              />
            </Card>

            {/* Control Panel 2: Account Login Card */}
            <Card title="拟物账户表单" padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input label="手机号/邮箱" placeholder="请输入您的账号" defaultValue="17856916674" />
                <Input label="密码" type="password" placeholder="请输入密码" defaultValue="wl000625" />
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '8px' 
                }}>
                  {/* Round matte skeuomorphic checkbox */}
                  <Checkbox label="自动登录" defaultChecked />
                  
                  <div style={{ display: 'flex', gap: '8px', fontSize: '14px' }}>
                    <a href="#" style={{ color: 'var(--s-color-primary-active)', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>验证码登录</a>
                    <span style={{ color: 'var(--s-color-border-soft)' }}>|</span>
                    <a href="#" style={{ color: 'var(--s-color-primary-active)', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>找回密码</a>
                  </div>
                </div>

                <Button variant="primary" style={{ width: '100%', marginTop: '12px' }}>登录</Button>
              </div>
            </Card>

            {/* Control Panel 3: Other Component Demos */}
            <Card title="分段选择与弹窗" padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--s-color-text-secondary)', marginBottom: '8px' }}>物理分段选项</span>
                  <SegmentedControl 
                    options={[
                      { label: '侧键指令', value: '1' },
                      { label: '双击挤压', value: '2' },
                      { label: '单击挤压', value: '3' }
                    ]} 
                    defaultValue="1"
                  />
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--s-color-text-secondary)', marginBottom: '8px' }}>BigBang 文本块</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Chip selected>Smartisan</Chip>
                    <Chip>OneStep</Chip>
                    <Chip>BigBang</Chip>
                    <Chip compact>，</Chip>
                    <Chip compact>。</Chip>
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--s-color-text-secondary)', marginBottom: '8px' }}>BigBang 搜索选项弹窗</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                    <Button variant="secondary" onClick={() => setIsBigBangOptionOpen((open) => !open)}>
                      {isBigBangOptionOpen ? '收起搜索选项' : `当前：${BIGBANG_SEARCH_OPTIONS[selectedSearchProvider].label}`}
                    </Button>
                    {isBigBangOptionOpen && (
                      <BigBangOptionPopup
                        options={BIGBANG_SEARCH_OPTIONS}
                        selectedIndex={selectedSearchProvider}
                        onSelect={setSelectedSearchProvider}
                        onDismiss={() => setIsBigBangOptionOpen(false)}
                        arrowOffset={0}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--s-color-text-secondary)', marginBottom: '8px' }}>OneStep 拖拽浮层</span>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', flexWrap: 'wrap' }}>
                    <DragBubble>拖到侧栏发送</DragBubble>
                    <DragBubble variant="preview" side="left" icon={<span style={{ fontWeight: 700 }}>文</span>}>
                      Smartisan UI 官方校准
                    </DragBubble>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>展示悬浮弹窗</Button>
                  <Button variant="danger" onClick={() => setIsActionSheetOpen(true)}>展示底部操作菜单</Button>
                  <Button variant="secondary" onClick={showProgressDialog}>展示官方进度弹窗</Button>
                  <Button variant="secondary" disabled>物理禁用按钮</Button>
                </div>
              </div>
            </Card>

            <Card title="BigBang 搜索窗口" padding="sm">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BigBangSearchPanel
                  title="Smartisan UI"
                  query="官方组件校准"
                  activeMode={bigBangSearchMode}
                  loading={bigBangSearchLoading}
                  onModeChange={handleBigBangModeChange}
                  canGoBack={bigBangSearchMode !== 'web'}
                />
              </div>
            </Card>

            <Card title="OneStep 内容列表" padding="lg">
              <div style={{ padding: '24px', borderRadius: '8px', background: 'var(--s-color-onestep-dim)' }}>
                <OneStepPanel title="剪贴板与最近文件" onClear={() => undefined}>
                  <OneStepItem
                    date="今天 16:48"
                    title="Smartisan UI 官方校准：OneStep 列表项"
                    variant="text"
                    onClick={() => undefined}
                  />
                  <OneStepItem
                    title="official-layout-notes.pdf"
                    variant="file"
                    icon={<span style={{ fontWeight: 700 }}>PDF</span>}
                    onClick={() => undefined}
                  />
                  <OneStepItem
                    title="SmartisanTech / packages_apps_OneStep"
                    subtitle="github.com/SmartisanTech/packages_apps_OneStep"
                    variant="bookmark"
                    onClick={() => undefined}
                  />
                  <OneStepItem title="加载更多" variant="more" onClick={() => undefined} />
                </OneStepPanel>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* 4. Section 3: Design Tokens Reference Specs */}
      <section id="tokens-section" style={{ padding: '80px 24px', background: 'var(--s-color-surface-flat)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 300, color: 'var(--s-color-text-primary)', marginBottom: '12px' }}>设计令牌与样式规范</h3>
            <p style={{ fontSize: '14px', color: 'var(--s-color-text-secondary)' }}>本设计系统底层基于 CSS Variables 构建的拟物阴影与材质规范 (tokens.css)</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Spec Row 1: Colors */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--s-color-text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--s-color-border-soft)', paddingBottom: '8px' }}>配色板 (Colors)</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--s-color-primary)', boxShadow: 'var(--s-shadow-drop)' }}></div>
                  <div>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>主色 (Primary)</span>
                    <span style={{ fontSize: '12px', color: 'var(--s-color-text-secondary)' }}>--s-color-primary</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--s-color-bg)', border: '1px solid var(--s-color-border)' }}></div>
                  <div>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>背景色 (Background)</span>
                    <span style={{ fontSize: '12px', color: 'var(--s-color-text-secondary)' }}>--s-color-bg</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--s-color-surface)', border: '1px solid var(--s-color-border)' }}></div>
                  <div>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>卡片面板 (Surface)</span>
                    <span style={{ fontSize: '12px', color: 'var(--s-color-text-secondary)' }}>--s-color-surface</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Spec Row 2: Shadows */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--s-color-text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--s-color-border-soft)', paddingBottom: '8px' }}>物理光影令牌 (Shadows & Depth)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                
                <div style={{ padding: '20px', background: 'var(--s-color-surface-panel-header)', borderRadius: '8px', border: '1px solid var(--s-color-border-soft)' }}>
                  <div style={{ height: '40px', background: 'var(--s-color-surface-flat)', borderRadius: '6px', boxShadow: 'var(--s-shadow-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--s-color-text-secondary)' }}>
                    悬浮卡片
                  </div>
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginTop: '12px' }}>浮雕卡片阴影 (Panel Shadow)</span>
                  <code style={{ fontSize: '11px', color: 'var(--s-color-primary)', display: 'block', marginTop: '4px' }}>--s-shadow-panel</code>
                </div>

                <div style={{ padding: '20px', background: 'var(--s-color-surface-panel-header)', borderRadius: '8px', border: '1px solid var(--s-color-border-soft)' }}>
                  <div style={{ height: '40px', background: 'var(--s-color-surface-flat)', borderRadius: '6px', boxShadow: 'var(--s-shadow-pressed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--s-color-text-secondary)' }}>
                    下陷按钮
                  </div>
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginTop: '12px' }}>物理按压阴影 (Pressed Inset)</span>
                  <code style={{ fontSize: '11px', color: 'var(--s-color-primary)', display: 'block', marginTop: '4px' }}>--s-shadow-pressed</code>
                </div>

                <div style={{ padding: '20px', background: 'var(--s-color-surface-panel-header)', borderRadius: '8px', border: '1px solid var(--s-color-border-soft)' }}>
                  <div style={{ height: '40px', background: 'var(--s-color-surface-flat)', borderRadius: '6px', boxShadow: 'var(--s-shadow-inset-groove)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--s-color-text-secondary)' }}>
                    滑动凹槽
                  </div>
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginTop: '12px' }}>深孔下凹阴影 (Inset Groove)</span>
                  <code style={{ fontSize: '11px', color: 'var(--s-color-primary)', display: 'block', marginTop: '4px' }}>--s-shadow-inset-groove</code>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Floating Bullet Navigation (Vertical pill menu on the right edge) */}
      <nav className="bulletNav">
        <div 
          className={`bulletDot ${activeSection === 'hero' ? 'bulletDotActive' : ''}`} 
          onClick={() => scrollToSection('hero-section')}
          title="系统介绍"
        ></div>
        <div 
          className={`bulletDot ${activeSection === 'playground' ? 'bulletDotActive' : ''}`} 
          onClick={() => scrollToSection('playground-section')}
          title="组件演练"
        ></div>
        <div 
          className={`bulletDot ${activeSection === 'tokens' ? 'bulletDotActive' : ''}`} 
          onClick={() => scrollToSection('tokens-section')}
          title="设计令牌"
        ></div>
        
        {/* Scroll back to top */}
        <div className="bulletScrollTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
      </nav>

      {/* 6. System Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="系统提示">
        这是一个 Smartisan 风格的悬浮弹窗。请注意观察右上角那个带有白色描边和深灰色底色的经典实体关闭按钮。
      </Dialog>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        title="官方 MenuDialog 校准"
        actions={[
          { label: '保存更改', variant: 'primary' },
          { label: '删除配置', variant: 'danger' },
          { label: '保持当前设置' },
        ]}
      >
        底部贴边、强遮罩、标题栏和实体按钮来自 SmartisanOS MenuDialog 的结构。
      </ActionSheet>

      <ProgressDialog
        isOpen={isProgressDialogOpen}
        title="正在同步"
        message="请稍候，正在处理系统设置"
      />

    </div>
  );
}

export default App;
