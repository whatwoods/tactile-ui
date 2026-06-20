import React, { useState } from 'react';
import styles from './WorkbenchPage.module.css';
import { Chassis } from '../../components/Chassis/Chassis';
import { Switch } from '../../components/Switch/Switch';
import { Input } from '../../components/Input/Input';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Slider } from '../../components/Slider/Slider';
import { Button } from '../../components/Button/Button';
import { Dialog } from '../../components/Dialog/Dialog';
import { ActionSheet } from '../../components/ActionSheet/ActionSheet';
import { Chip } from '../../components/Chip/Chip';
import { SettingItem } from '../../components/SettingItem/SettingItem';
import { List } from '../../components/List/List';
import { ListItem } from '../../components/List/ListItem';
import { TitleBar } from '../../components/TitleBar/TitleBar';
import { ProgressDialog } from '../../components/ProgressDialog/ProgressDialog';
import { Progress } from '../../components/Progress/Progress';
import { Icon } from '../../components/Icon/Icon';
import { DragBubble } from '../../components/DragBubble/DragBubble';
import { BigBangOptionPopup } from '../../components/BigBangOptionPopup/BigBangOptionPopup';
import { BigBangSearchPanel } from '../../components/BigBangSearchPanel/BigBangSearchPanel';
import type { BigBangSearchMode } from '../../components/BigBangSearchPanel/BigBangSearchPanel';
import { OneStepItem, OneStepPanel } from '../../components/OneStepItem/OneStepItem';
import { OneStepPhotoGrid } from '../../components/OneStepPhotoGrid/OneStepPhotoGrid';
import { OneStepShortcut } from '../../components/OneStepShortcut/OneStepShortcut';
import { OneStepTopBar } from '../../components/OneStepTopBar/OneStepTopBar';
import { playClickSound, playTickSound } from '../../utils/sound';

interface WorkbenchPageProps {
  onBackToClassic: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const BIGBANG_SEARCH_OPTIONS = [
  { label: '百度', icon: '百' },
  { label: '神马搜索', icon: '神' },
  { label: '必应词典', icon: 'B' },
];

export const WorkbenchPage: React.FC<WorkbenchPageProps> = ({
  onBackToClassic,
  audioEnabled,
  onToggleAudio,
}) => {
  // Dialog & Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [progressDialogTone, setProgressDialogTone] = useState<'light' | 'dark'>('light');

  // Device States
  const [isMute, setIsMute] = useState(false);
  const [stepValue, setStepValue] = useState(0); // 0-4
  const [volume, setVolume] = useState(40);
  const [brightness, setBrightness] = useState(70);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('classic');
  const [oneStepEnabled, setOneStepEnabled] = useState(true);
  const [selectedSearchProvider, setSelectedSearchProvider] = useState(0);
  const [isBigBangOptionOpen, setIsBigBangOptionOpen] = useState(false);
  const [bigBangSearchMode, setBigBangSearchMode] = useState<BigBangSearchMode>('dict');
  const [bigBangSearchLoading, setBigBangSearchLoading] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);

  // Layout values
  const stepLabels = ['一直', '1小时', '2小时', '4小时', '8小时'];

  // Handle dial knob click
  const handleDialClick = () => {
    const nextStep = (stepValue + 1) % 5;
    setStepValue(nextStep);
    playTickSound(audioEnabled, 900 + nextStep * 80);
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value);
    // Play tick sound when passing intervals of 8
    if (value % 8 === 0) {
      playTickSound(audioEnabled, 1200);
    }
  };

  const showProgressDialog = (tone: 'light' | 'dark' = 'light') => {
    playClickSound(audioEnabled, 800, 0.08);
    setProgressDialogTone(tone);
    setIsProgressDialogOpen(true);
    window.setTimeout(() => setIsProgressDialogOpen(false), 1600);
  };

  const handleBigBangModeChange = (mode: BigBangSearchMode) => {
    playClickSound(audioEnabled, 900, 0.06);
    setBigBangSearchMode(mode);
    setBigBangSearchLoading(true);
    window.setTimeout(() => setBigBangSearchLoading(false), 1200);
  };

  const handleButtonClick = (action: () => void, pitch = 850) => {
    playClickSound(audioEnabled, pitch, 0.07, 'triangle');
    action();
  };

  return (
    <div className={styles.workbenchWrapper}>
      {/* 1. Lab Header Controls */}
      <header className={styles.workbenchHeader}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            className={styles.classicKey}
            onClick={() => handleButtonClick(onBackToClassic, 650)}
          >
            <span className={styles.classicKeyIcon}>◀</span>
            返回经典展示页
          </button>
        </div>
        <div className={styles.headerCenter}>
          <h1 className={styles.workbenchTitle}>拟物物理交互实验台</h1>
          <span className={styles.headerSubtitle}>TACTILE HARDWARE LAB</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.audioControl}>
            <span className={styles.audioLabel}>GLOBAL SOUND</span>
            <button
              type="button"
              className={`${styles.audioToggle} ${audioEnabled ? styles.audioToggleOn : ''}`}
              onClick={onToggleAudio}
              title={audioEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              <div className={styles.audioToggleHandle}></div>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workbench Deck */}
      <main className={styles.workbenchDeck}>
        <div className={styles.workbenchGrid}>
          {/* Module 1: TACTILE MIXER T-80 */}
          <Chassis
            title="TACTILE MIXER"
            model="MODEL T-80"
            ledColor="green"
            audioEnabled={audioEnabled}
          >
            <div className={styles.mixerContent}>
              <div className={styles.mixerTopRow}>
                <span className={styles.panelSubtitle}>AUDIO & LIGHT CONTROLLER</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={styles.textLabel}>MUTE</span>
                  <Switch
                    checked={isMute}
                    onChange={(checked) => {
                      playClickSound(audioEnabled, checked ? 600 : 750, 0.05);
                      setIsMute(checked);
                    }}
                  />
                </div>
              </div>

              {/* Rotary Selector & Volume Fader side by side */}
              <div className={styles.mixerBody}>
                <div className={styles.dialKnobSection}>
                  <span className={styles.knobTitle}>MUTE TIMER</span>
                  <div className={styles.dialPlate}>
                    {/* Tick markers */}
                    <div className={`${styles.tickMark} ${styles.tick0}`} data-active={stepValue === 0}></div>
                    <div className={`${styles.tickMark} ${styles.tick1}`} data-active={stepValue === 1}></div>
                    <div className={`${styles.tickMark} ${styles.tick2}`} data-active={stepValue === 2}></div>
                    <div className={`${styles.tickMark} ${styles.tick3}`} data-active={stepValue === 3}></div>
                    <div className={`${styles.tickMark} ${styles.tick4}`} data-active={stepValue === 4}></div>

                    <button
                      type="button"
                      className={styles.rotaryKnob}
                      style={{ transform: `rotate(${stepValue * 72}deg)` }}
                      onClick={handleDialClick}
                      aria-label="Set mute duration"
                    >
                      <div className={styles.knobNotch}></div>
                    </button>
                  </div>
                  <span className={styles.knobValue}>{stepLabels[stepValue]}</span>
                </div>

                <div className={styles.mixerSliders}>
                  <div className={styles.sliderRow}>
                    <Slider
                      value={volume}
                      onChange={(val) => handleSliderChange(setVolume, val)}
                      fillColor={isMute ? 'grey' : 'blue'}
                      iconLeft={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: isMute ? 0.38 : 0.7 }}>
                          <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
                          <line x1="11" y1="18" x2="13" y2="18" />
                          <path d="M3 8a8.5 8.5 0 0 0 0 8M1 10a11.5 11.5 0 0 0 0 4" />
                        </svg>
                      }
                      iconRight={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: isMute ? 0.38 : 0.7 }}>
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                      }
                    />
                  </div>

                  <div className={styles.sliderRow}>
                    <Slider
                      value={brightness}
                      onChange={(val) => handleSliderChange(setBrightness, val)}
                      fillColor="blue"
                      iconLeft={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                          <circle cx="12" cy="12" r="3.5" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
                        </svg>
                      }
                      iconRight={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                          <circle cx="12" cy="12" r="5.5" />
                          <path d="M12 1v2M12 21v2M3.22 3.22l1.42 1.42M19.36 19.36l1.42 1.42M1 12h2M21 12h2" />
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Chassis>

          {/* Module 2: LOGIC TERMINAL S-12 */}
          <Chassis
            title="LOGIC TERMINAL"
            model="MODEL S-12"
            ledColor="blue"
            audioEnabled={audioEnabled}
          >
            <div className={styles.terminalContent}>
              <span className={styles.panelSubtitle}>SYSTEM CALIBRATION PANEL</span>
              <div style={{ marginBottom: '14px', background: 'var(--s-color-surface-sunken)', padding: '12px', borderRadius: 'var(--s-radius-lg)', border: '1px solid var(--s-color-border-soft)' }}>
                <span className={styles.textLabel} style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: 'bold' }}>按压反馈模式</span>
                <SegmentedControl
                  options={[
                    { label: '双击挤压', value: 'double' },
                    { label: '单击挤压', value: 'single' },
                  ]}
                  defaultValue="double"
                  onChange={() => playClickSound(audioEnabled, 900, 0.05)}
                />
              </div>
              <div className={styles.embeddedList}>
                <TitleBar
                  title="声音与触感"
                  backLabel="返回"
                  confirmLabel="已保存"
                  confirmDisabled
                  onBack={() => playClickSound(audioEnabled, 700)}
                />
                <List>
                  <ListItem
                    title="无线局域网"
                    subtitle="连接：Smartisan Lab"
                    value={wifiEnabled ? '已开启' : '已关闭'}
                    accessory="chevron"
                    onClick={() => {
                      playClickSound(audioEnabled, 800, 0.05);
                      setWifiEnabled(!wifiEnabled);
                    }}
                  />
                  <SettingItem
                    title="OneStep 快捷侧栏"
                    summary="物理阻尼卡片流通道"
                    accessory="switch"
                    checked={oneStepEnabled}
                    onCheckedChange={(checked: boolean) => {
                      playClickSound(audioEnabled, checked ? 900 : 700);
                      setOneStepEnabled(checked);
                    }}
                  />
                  <ListItem
                    title="经典提示音"
                    subtitle="还原物理齿轮机械咬合声音"
                    accessory="check"
                    selected={selectedSound === 'classic'}
                    onClick={() => {
                      playClickSound(audioEnabled, 1000, 0.08);
                      setSelectedSound('classic');
                    }}
                  />
                  <ListItem
                    title="轻触提示音"
                    subtitle="更为短促、轻灵的物理按压声"
                    accessory="check"
                    selected={selectedSound === 'tap'}
                    onClick={() => {
                      playClickSound(audioEnabled, 1200, 0.04);
                      setSelectedSound('tap');
                    }}
                  />
                </List>
              </div>
            </div>
          </Chassis>

          {/* Module 3: GATEWAY ACCESS PANEL G-20 */}
          <Chassis
            title="GATEWAY ACCESS"
            model="SYS G-20"
            ledColor="orange"
            audioEnabled={audioEnabled}
          >
            <div className={styles.gatewayContent}>
              <span className={styles.panelSubtitle}>SECURITY ACCESS CONTROLLER</span>
              <div className={styles.sunkenForm}>
                <Input
                  label="门禁卡ID"
                  placeholder="请输入手机号/邮箱"
                  defaultValue="17856916674"
                />
                <Input
                  label="安全密码"
                  type="password"
                  placeholder="请输入安全密码"
                  defaultValue="wl000625"
                />

                <div className={styles.formOptions}>
                  <Checkbox
                    label="保存凭证"
                    checked={autoLogin}
                    onChange={(e) => {
                      playClickSound(audioEnabled, 850, 0.04);
                      setAutoLogin(e.target.checked);
                    }}
                  />
                  <div className={styles.linkGroup}>
                    <a href="#" className={styles.formLink} onClick={(e) => { e.preventDefault(); playClickSound(audioEnabled, 900); }}>动态令牌</a>
                    <span className={styles.divider}>|</span>
                    <a href="#" className={styles.formLink} onClick={(e) => { e.preventDefault(); playClickSound(audioEnabled, 900); }}>找回密码</a>
                  </div>
                </div>

                <Button
                  variant="primary"
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => playClickSound(audioEnabled, 750, 0.12, 'triangle')}
                >
                  验证进入
                </Button>
              </div>
            </div>
          </Chassis>

          {/* Module 4: PULSE DISPATCHER D-4 */}
          <Chassis
            title="PULSE DISPATCHER"
            model="UNIT D-4"
            ledColor="red"
            audioEnabled={audioEnabled}
          >
            <div className={styles.dispatcherContent}>
              <span className={styles.panelSubtitle}>PULSE DIALOG TRIGGER BAY</span>
              <div className={styles.keypadGrid}>
                {/* Heavy mechanical keys layout */}
                <button
                  type="button"
                  className={styles.keypadBtn}
                  onClick={() => handleButtonClick(() => setIsDialogOpen(true), 900)}
                >
                  <div className={styles.btnCap}>唤醒 悬浮提示框</div>
                  <span className={styles.btnLabel}>DIALOG</span>
                </button>

                <button
                  type="button"
                  className={`${styles.keypadBtn} ${styles.btnDanger}`}
                  onClick={() => handleButtonClick(() => setIsActionSheetOpen(true), 1100)}
                >
                  <div className={styles.btnCap}>呼叫 底部菜单</div>
                  <span className={styles.btnLabel}>MENU</span>
                </button>

                <button
                  type="button"
                  className={styles.keypadBtn}
                  onClick={() => showProgressDialog('light')}
                >
                  <div className={styles.btnCap}>启动 浅色进度同步</div>
                  <span className={styles.btnLabel}>SYNC_LIGHT</span>
                </button>

                <button
                  type="button"
                  className={styles.keypadBtn}
                  onClick={() => showProgressDialog('dark')}
                >
                  <div className={styles.btnCap}>启动 深色进度同步</div>
                  <span className={styles.btnLabel}>SYNC_DARK</span>
                </button>
              </div>

              {/* Status bar */}
              <div className={styles.statusBar}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <Icon size="sm" tone="primary" label="同步状态">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  </Icon>
                  <div style={{ flex: 1 }}>
                    <Progress value={isDialogOpen || isActionSheetOpen ? 100 : 38} />
                  </div>
                </div>
              </div>
            </div>
          </Chassis>

          {/* Module 5: BIGBANG SCANNER B-9 */}
          <Chassis
            title="BIGBANG SCANNER"
            model="UNIT B-9"
            ledColor="cyan"
            audioEnabled={audioEnabled}
          >
            <div className={styles.scannerContent}>
              <span className={styles.panelSubtitle}>TEXT CHIP SPLITTING DECK</span>

              {/* Text tape output well */}
              <div className={styles.tapeWell}>
                <div className={styles.tapeSlit}></div>
                <div className={styles.tapeContent}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <Chip selected onClick={() => playClickSound(audioEnabled, 1000, 0.03)}>Smartisan</Chip>
                    <Chip onClick={() => playClickSound(audioEnabled, 950, 0.03)}>OneStep</Chip>
                    <Chip onClick={() => playClickSound(audioEnabled, 900, 0.03)}>BigBang</Chip>
                    <Chip compact onClick={() => playClickSound(audioEnabled, 800, 0.03)}>，</Chip>
                    <Chip selected onClick={() => playClickSound(audioEnabled, 950, 0.03)}>拟物化</Chip>
                    <Chip onClick={() => playClickSound(audioEnabled, 900, 0.03)}>重制版</Chip>
                    <Chip compact onClick={() => playClickSound(audioEnabled, 800, 0.03)}>。</Chip>
                  </div>
                </div>
              </div>

              {/* Embedded search monitor */}
              <div className={styles.searchMonitor}>
                <BigBangSearchPanel
                  title="Smartisan UI"
                  query="拟物分词检测"
                  activeMode={bigBangSearchMode}
                  loading={bigBangSearchLoading}
                  onModeChange={handleBigBangModeChange}
                  canGoBack={bigBangSearchMode !== 'web'}
                />
              </div>

              {/* Provider selection buttons */}
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  variant="secondary"
                  onClick={() => handleButtonClick(() => setIsBigBangOptionOpen(!isBigBangOptionOpen))}
                >
                  {isBigBangOptionOpen ? '收起配置选项' : `搜索引擎：${BIGBANG_SEARCH_OPTIONS[selectedSearchProvider].label}`}
                </Button>
                {isBigBangOptionOpen && (
                  <div className={styles.popupContainer}>
                    <BigBangOptionPopup
                      options={BIGBANG_SEARCH_OPTIONS}
                      selectedIndex={selectedSearchProvider}
                      onSelect={(idx) => {
                        playClickSound(audioEnabled, 950, 0.05);
                        setSelectedSearchProvider(idx);
                        setIsBigBangOptionOpen(false);
                      }}
                      onDismiss={() => setIsBigBangOptionOpen(false)}
                      arrowOffset={0}
                    />
                  </div>
                )}
              </div>
            </div>
          </Chassis>

          {/* Module 6: ONE-STEP TRANSPORT PORT O-1 */}
          <Chassis
            title="ONE-STEP PORT"
            model="SYS O-1"
            ledColor="violet"
            audioEnabled={audioEnabled}
          >
            <div className={styles.onestepContent}>
              <span className={styles.panelSubtitle}>PNEUMATIC FILE TRANSIT PORT</span>

              <div className={styles.onestepWorkspace}>
                {/* Simulated vertical shortcuts column & top bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <OneStepTopBar
                    items={[
                      { id: 'photos', label: '图片传送', onClick: () => playClickSound(audioEnabled, 950) },
                      { id: 'files', label: '文档同步', onClick: () => playClickSound(audioEnabled, 950) },
                      { id: 'clipboard', label: '剪贴板', onClick: () => playClickSound(audioEnabled, 950) },
                    ]}
                  />

                  <div className={styles.onestepContainerBody}>
                    <div className={styles.shortcutsStrip}>
                      <OneStepShortcut label="邮件" onClick={() => playClickSound(audioEnabled, 900)} />
                      <OneStepShortcut variant="contact" label="罗永浩" badge="微" onClick={() => playClickSound(audioEnabled, 900)} />
                      <OneStepShortcut variant="previous" label="上个应用" onClick={() => playClickSound(audioEnabled, 900)} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <OneStepPanel title="最近同步项" onClear={() => playClickSound(audioEnabled, 650)}>
                        <OneStepItem
                          date="今日 17:34"
                          title="拟物控制台-机箱面板参数 specs.json"
                          variant="text"
                          onClick={() => playClickSound(audioEnabled, 900)}
                        />
                        <OneStepItem
                          title="chassis-ventilation-design.dwg"
                          variant="file"
                          icon={<span style={{ fontSize: '9px', fontWeight: 'bold' }}>CAD</span>}
                          onClick={() => playClickSound(audioEnabled, 900)}
                        />
                        <OneStepPhotoGrid
                          date="最近快照"
                          items={[
                            { state: 'image', alt: '快照 1', onClick: () => playClickSound(audioEnabled, 900) },
                            { state: 'openGallery', onClick: () => playClickSound(audioEnabled, 900) },
                            { state: 'more', onClick: () => playClickSound(audioEnabled, 900) },
                          ]}
                        />
                      </OneStepPanel>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drag bubble component dock */}
              <div className={styles.dragDock}>
                <DragBubble variant="preview" side="right" icon={<span style={{ fontWeight: 800 }}>M</span>}>
                  拖拽物理卡片即可发送
                </DragBubble>
              </div>
            </div>
          </Chassis>
        </div>
      </main>

      {/* 3. Global overlays for the Dialogs */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="物理中枢调度提示">
        这是一个由 <b>PULSE DISPATCHER D-4</b> 控制器发起的系统弹窗。
        <br />
        请注意观察右上角那个带有精致白色高光边框和金属阻尼的物理关闭按钮，每一次点击都将被实验台调度并记录。
      </Dialog>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        title="门禁安全操作菜单 (MenuDialog)"
        actions={[
          { label: '确认解锁舱门', variant: 'primary' },
          { label: '强制停机紧急切断', variant: 'danger' },
          { label: '维持当前就绪状态' },
        ]}
      >
        该底部滑动菜单模拟了 SmartisanOS 的经典 MenuDialog 样式。
      </ActionSheet>

      <ProgressDialog
        isOpen={isProgressDialogOpen}
        tone={progressDialogTone}
        title="正在配置"
        message="中枢控制器正在与终端设备进行频率校准，请勿切断物理电源..."
      />
    </div>
  );
};
