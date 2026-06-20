import { useState } from 'react';
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
import { List } from './components/List/List';
import { ListItem } from './components/List/ListItem';
import { TitleBar } from './components/TitleBar/TitleBar';
import { ProgressDialog } from './components/ProgressDialog/ProgressDialog';
import { Progress } from './components/Progress/Progress';
import { Icon } from './components/Icon/Icon';
import { DragBubble } from './components/DragBubble/DragBubble';
import { BigBangOptionPopup } from './components/BigBangOptionPopup/BigBangOptionPopup';
import { BigBangSearchPanel } from './components/BigBangSearchPanel/BigBangSearchPanel';
import type { BigBangSearchMode } from './components/BigBangSearchPanel/BigBangSearchPanel';
import { OneStepItem, OneStepPanel } from './components/OneStepItem/OneStepItem';
import { OneStepPhotoGrid } from './components/OneStepPhotoGrid/OneStepPhotoGrid';
import { OneStepShortcut } from './components/OneStepShortcut/OneStepShortcut';
import { OneStepTopBar } from './components/OneStepTopBar/OneStepTopBar';
import { Hero } from './components/Hero/Hero';
import { SideNav } from './components/SideNav/SideNav';
import { WorkbenchPage } from './pages/WorkbenchPage/WorkbenchPage';
import { playClickSound } from './utils/sound';


const BIGBANG_SEARCH_OPTIONS = [
  { label: '百度', icon: '百' },
  { label: '神马搜索', icon: '神' },
  { label: '必应词典', icon: 'B' },
];

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
    id: 'playground-section',
    label: '组件演练',
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
  const [view, setView] = useState<'classic' | 'workbench'>('classic');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [isBigBangOptionOpen, setIsBigBangOptionOpen] = useState(true);
  const [progressDialogTone, setProgressDialogTone] = useState<'light' | 'dark'>('light');
  
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

  // Active section for navigation states
  const [activeNav, setActiveNav] = useState('hero-section');



  const showProgressDialog = (tone: 'light' | 'dark' = 'light') => {
    setProgressDialogTone(tone);
    setIsProgressDialogOpen(true);
    window.setTimeout(() => setIsProgressDialogOpen(false), 1400);
  };

  const handleBigBangModeChange = (mode: BigBangSearchMode) => {
    setBigBangSearchMode(mode);
    setBigBangSearchLoading(true);
    window.setTimeout(() => setBigBangSearchLoading(false), 1200);
  };

  if (view === 'workbench') {
    return (
      <WorkbenchPage
        onBackToClassic={() => setView('classic')}
        audioEnabled={!isMute}
        onToggleAudio={() => setIsMute(!isMute)}
      />
    );
  }

  return (
    <div style={{ minHeight: '150vh', background: 'var(--s-color-surface-flat)', position: 'relative' }}>
      
      {/* 1. Header component (double-level with sticky scroll transition) */}
      <Header />

      {/* 2. Section 1: Hero Section - Smartisan UI Introduction */}
      <Hero onEnterWorkbench={() => {
        playClickSound(!isMute, 750);
        setView('workbench');
      }} />


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
            
            {/* 截图校准对照组 (Screenshot Alignment) */}
            <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <Card title="官方组件截图校准对齐 (Screenshot Alignment)" padding="lg">
                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0 30px', border: '1px solid var(--s-color-border-soft)', boxShadow: 'var(--s-shadow-panel)', display: 'flex', flexDirection: 'column', gap: '0px' }}>
                  {/* 行 1：静音开关 (主控行 110px) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '110px', borderBottom: '1px solid var(--s-color-border-soft)', width: '100%' }}>
                    <span style={{ fontSize: '20px', fontWeight: 500, color: 'var(--s-color-text-primary)' }}>静音</span>
                    <Switch checked={isMute} onChange={(checked) => setIsMute(checked)} />
                  </div>
                  
                  {/* 行 2：震动滑块 (普通控制行 104px) */}
                  <div style={{ height: '104px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--s-color-border-soft)', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <Slider 
                        value={volume}
                        onChange={(val) => setVolume(val)}
                        fillColor={isMute ? 'grey' : 'blue'}
                        iconLeft={
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--s-color-icon-muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
                            <line x1="11" y1="18" x2="13" y2="18" />
                            <path d="M3 8a8.5 8.5 0 0 0 0 8M1 10a11.5 11.5 0 0 0 0 4M21 8a8.5 8.5 0 0 1 0 8M23 10a11.5 11.5 0 0 1 0 4" />
                          </svg>
                        }
                        iconRight={
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--s-color-icon-muted)" style={{ marginLeft: '8px' }}>
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          </svg>
                        }
                      />
                    </div>
                  </div>
                  
                  {/* 行 3：亮度滑块 (普通控制行 104px) */}
                  <div style={{ height: '104px', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <Slider 
                        value={brightness}
                        onChange={(val) => setBrightness(val)}
                        fillColor="blue"
                        iconLeft={
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--s-color-icon-muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <circle cx="12" cy="12" r="3.5"/>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                          </svg>
                        }
                        iconRight={
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--s-color-icon-muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <circle cx="12" cy="12" r="5.5"/>
                            <path d="M12 1v2M12 21v2M3.22 3.22l1.42 1.42M19.36 19.36l1.42 1.42M1 12h2M21 12h2M4.64 19.36l-1.42 1.42M20.78 3.22l-1.42 1.42"/>
                          </svg>
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Control Panel 1: Sound Control (Switch & Sliders) */}
            <Card id="switch-card" title="静音与阻尼滑块" padding="none">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* 行 1：静音开关 (主控行 110px) */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  height: '110px',
                  borderBottom: '1px solid var(--s-color-border-soft)',
                  padding: '0 30px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--s-color-text-primary)' }}>系统静音 (物理开关)</span>
                  <Switch checked={isMute} onChange={(checked) => setIsMute(checked)} />
                </div>

                {/* 行 2：静音延时 (条件渲染，普通控制行 104px) */}
                {isMute && (
                  <div style={{ 
                    height: '104px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--s-color-border-soft)',
                    padding: '0 30px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ width: '100%' }}>
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
                  </div>
                )}

                {/* 行 3：震动滑块 (普通控制行 104px) */}
                <div style={{ 
                  height: '104px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--s-color-border-soft)',
                  padding: '0 30px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ width: '100%' }}>
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
                </div>

                {/* 行 4：亮度滑块 (普通控制行 104px) */}
                <div style={{ 
                  height: '104px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 30px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ width: '100%' }}>
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

            <Card title="通用列表项校准" padding="none">
              <List>
                <ListItem
                  title="设备名称"
                  subtitle="基础 item_text_layout 读线"
                  value="Smartisan T2"
                  accessory="chevron"
                  onClick={() => undefined}
                />
                <ListItem
                  title="经典提示音"
                  subtitle="item_check_layout 选择行"
                  accessory="check"
                  selected={selectedSound === 'classic'}
                  onClick={() => setSelectedSound('classic')}
                />
                <ListItem
                  title="轻触提示音"
                  subtitle="右侧勾选仅表达当前状态"
                  accessory="check"
                  selected={selectedSound === 'tap'}
                  onClick={() => setSelectedSound('tap')}
                />
              </List>
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
            <Card id="form-card" title="拟物账户表单" padding="lg">
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
            <Card id="dialog-card" title="分段选择与弹窗" padding="lg">
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
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--s-color-text-secondary)', marginBottom: '8px' }}>图标容器与条形进度</span>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon size="sm" tone="muted" surface label="系统设置">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.08A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.08A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
                        </svg>
                      </Icon>
                      <Icon size="md" tone="primary" label="完成">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </Icon>
                      <div style={{ flex: 1 }}>
                        <Progress value={68} />
                      </div>
                    </div>
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
                  <Button variant="secondary" onClick={() => showProgressDialog('light')}>展示官方进度弹窗</Button>
                  <Button variant="secondary" onClick={() => showProgressDialog('dark')}>展示深色进度弹窗</Button>
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

            <Card title="OneStep 内容列表" padding="sm">
              <div style={{ padding: 'var(--s-space-3)', borderRadius: '8px', background: 'var(--s-color-onestep-dim)' }}>
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
                  <OneStepPhotoGrid
                    date="最近图片"
                    items={[
                      { state: 'image', alt: '最近图片预览', onClick: () => undefined },
                      { state: 'openGallery', onClick: () => undefined },
                      { state: 'more', onClick: () => undefined },
                    ]}
                  />
                  <OneStepItem title="加载更多" variant="more" onClick={() => undefined} />
                </OneStepPanel>
              </div>
            </Card>

            <Card title="OneStep 顶部入口与侧栏快捷方式" padding="sm">
              <div style={{ background: 'var(--s-color-onestep-root-dim)', borderRadius: '8px', overflow: 'hidden' }}>
                <OneStepTopBar
                  items={[
                    { id: 'photos', label: '近期图片', onClick: () => undefined },
                    { id: 'files', label: '近期文件', onClick: () => undefined },
                    { id: 'clipboard', label: '剪贴板', onClick: () => undefined },
                  ]}
                />
                <div style={{ display: 'flex', gap: 'var(--s-space-3)', alignItems: 'flex-start', padding: 'var(--s-space-4)' }}>
                  <div style={{ width: 'var(--s-size-sidebar-width)', background: 'var(--s-color-onestep-root-dim)' }}>
                    <OneStepShortcut label="邮件" onClick={() => undefined} />
                    <OneStepShortcut variant="contact" label="罗永浩" badge="微" onClick={() => undefined} />
                    <OneStepShortcut variant="previous" label="上个应用" onClick={() => undefined} />
                  </div>
                  <div style={{ minWidth: 0, color: 'var(--s-color-onestep-title-text)', fontSize: '13px', lineHeight: 1.6 }}>
                    官方侧栏入口固定为 48dp 宽；应用和联系人头像内容为 32dp，顶部入口使用三等分布局。
                  </div>
                </div>
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
      <SideNav
        items={SIDE_NAV_ITEMS}
        activeId={activeNav}
        onChange={setActiveNav}
        onGithubClick={() => {
          window.open('https://github.com/SmartisanTech/android_frameworks_smartisanos-base', '_blank');
        }}
      />

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
        tone={progressDialogTone}
        title="正在同步"
        message="请稍候，正在处理系统设置"
      />

    </div>
  );
}

export default App;
