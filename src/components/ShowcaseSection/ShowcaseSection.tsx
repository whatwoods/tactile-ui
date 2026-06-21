import React, { useState } from 'react';
import styles from './ShowcaseSection.module.css';
import { Card } from '../Card/Card';
import { Switch } from '../Switch/Switch';
import { Slider } from '../Slider/Slider';
import { SettingItem } from '../SettingItem/SettingItem';
import { List } from '../List/List';
import { Input } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Icon } from '../Icon/Icon';
import { Progress } from '../Progress/Progress';
import { Alert } from '../Alert/Alert';
import { Badge } from '../Badge/Badge';
import { Tooltip } from '../Tooltip/Tooltip';
import { Popover } from '../Popover/Popover';
import { Spinner } from '../Spinner/Spinner';
import { Textarea } from '../Textarea/Textarea';
import { Tabs } from '../Tabs/Tabs';
import { Skeleton } from '../Skeleton/Skeleton';
import { useToast } from '../Toast/useToast';
import { Dialog } from '../Dialog/Dialog';
import { ActionSheet } from '../ActionSheet/ActionSheet';
import { ProgressDialog } from '../ProgressDialog/ProgressDialog';
import { Select } from '../Select/Select';

interface ShowcaseSectionProps {
  isMute: boolean;
  setIsMute: (mute: boolean) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ isMute, setIsMute }) => {
  const { toast } = useToast();

  // Dialog & Modal triggers
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [progressDialogTone, setProgressDialogTone] = useState<'light' | 'dark'>('light');

  // Local settings & form states
  const [selectedCountry, setSelectedCountry] = useState('CN');
  const [phone, setPhone] = useState('');
  
  const [volume, setVolume] = useState(30);
  const [brightness, setBrightness] = useState(80);
  const [unlockAnimation, setUnlockAnimation] = useState(true);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('classic');

  const showProgressDialog = (tone: 'light' | 'dark' = 'light') => {
    setProgressDialogTone(tone);
    setIsProgressDialogOpen(true);
    window.setTimeout(() => setIsProgressDialogOpen(false), 1400);
  };

  return (
    <section id="showcase-section" className={styles.showcaseSection}>
      {/* Scene 1: System Settings Panel (Option 1: Elevated 3D Panel) */}
      <div id="settings-scene" className={`${styles.sceneBlock} ${styles.sceneSettings}`}>
        <div className={styles.sceneContainer}>
          
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>场景演示：秩序与触感的协同</h3>
            <p className={styles.sectionSubtitle}>
              组件不是孤立的装饰。当物理触感与黄金比例融入真实的表单和设置面板中，系统级的秩序与工艺感才得以真正释放。
            </p>
          </div>
          <div className={styles.sceneGrid}>
            
            {/* Left Column: Visual Showcase (61.8%) */}
            <div className={styles.mockupCol}>
              <div className={styles.floatingCardsContainer}>
                
                {/* Card 1: Volume & Brightness Controls */}
                <div className={`${styles.elevatedPanelCard} ${styles.volumeCard}`}>
                  <Card padding="none">
                    <div className={styles.minimalSettingsLayout}>
                      
                      {/* Row 1: Mute switch */}
                      <div className={styles.minimalRow}>
                        <span className={styles.minimalLabel}>静音</span>
                        <Switch checked={isMute} onChange={(checked) => setIsMute(checked)} />
                      </div>

                      <div className={styles.minimalDivider} />

                      {/* Row 2: Volume Slider */}
                      <div className={styles.minimalSliderRow}>
                        <Slider 
                          value={volume}
                          onChange={(val) => setVolume(val)}
                          fillColor={isMute ? 'grey' : 'blue'}
                          iconLeft={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--s-color-text-tertiary)' }}>
                              <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
                              <line x1="11" y1="18" x2="13" y2="18" />
                              <path d="M3 8a8.5 8.5 0 0 0 0 8M1 10a11.5 11.5 0 0 0 0 4M21 8a8.5 8.5 0 0 1 0 8M23 10a11.5 11.5 0 0 1 0 4" />
                            </svg>
                          }
                          iconRight={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--s-color-text-tertiary)' }}>
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          }
                        />
                      </div>

                      <div className={styles.minimalDivider} />

                      {/* Row 3: Brightness Slider */}
                      <div className={styles.minimalSliderRow}>
                        <Slider 
                          value={brightness}
                          onChange={(val) => setBrightness(val)}
                          fillColor="blue"
                          iconLeft={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--s-color-text-tertiary)' }}>
                              <circle cx="12" cy="12" r="3.5"/>
                              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                            </svg>
                          }
                          iconRight={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--s-color-text-tertiary)' }}>
                              <circle cx="12" cy="12" r="5.5"/>
                              <path d="M12 1v2M12 21v2M3.22 3.22l1.42 1.42M19.36 19.36l1.42 1.42M1 12h2M21 12h2M4.64 19.36l-1.42 1.42M20.78 3.22l-1.42 1.42"/>
                            </svg>
                          }
                        />
                      </div>

                    </div>
                  </Card>
                </div>

                {/* Card 2: Main System Controls */}
                <div className={`${styles.elevatedPanelCard} ${styles.settingsListCard}`}>
                  <Card title="系统控制" padding="none">
                    <div className={styles.cardContentLayout}>
                      <div className={styles.settingsGroupContainer}>
                        <div>
                          <h5 className={styles.groupTitle}>无线局域网</h5>
                          <List className={styles.referenceList}>
                            <SettingItem
                              title="无线局域网"
                              summary="已连接 Smartisan Studio"
                              value={wifiEnabled ? '已开启' : '已关闭'}
                              accessory="chevron"
                              onClick={() => setWifiEnabled((enabled) => !enabled)}
                            />
                          </List>
                        </div>

                        <div>
                          <h5 className={styles.groupTitle}>提示音选择</h5>
                          <List className={styles.referenceList}>
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
                          </List>
                        </div>

                        <div>
                          <h5 className={styles.groupTitle}>解锁动画</h5>
                          <List className={styles.referenceList}>
                            <SettingItem
                              title="解锁动画"
                              accessory="switch"
                              checked={unlockAnimation}
                              onCheckedChange={setUnlockAnimation}
                            />
                          </List>
                          <p className={styles.groupDescription}>允许桌面解锁后播放缩放动画</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </div>

            {/* Right Column: Narrative Info (38.2%) */}
            <div className={styles.infoCol}>
              <h4 className={styles.sceneTitleText}>高精度基础控制组件</h4>
              <p className={styles.sceneDesc}>
                在设置面板中，设计的目标是营造「实体组件的秩序感」。通过统一的光源和 4px 网格步长，将扁平的选项转化为严密排布的物理模块。
              </p>
              
              <ul className={styles.featurePoints}>
                <li>
                  <strong>多层材质与镶嵌质感</strong>
                  <span>列表容器与开关轨道利用内阴影与边缘高光，模拟出硬质材料被精确铣削、镶嵌在底板上的真实感。</span>
                </li>
                <li>
                  <strong>物理开关与按压反馈</strong>
                  <span>无论是 Switch 开关的机械拨动，还是列表项的点按，组件都会随着交互产生符合物理法则的下沉与明暗变化。</span>
                </li>
                <li>
                  <strong>槽位分割与编组秩序</strong>
                  <span>设置项采用内嵌接缝与下沉凹槽排布，在规整的信息结构中创造出如同真实仪器仪表般的可靠秩序。</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Scene 2: SMS Verification Login Form */}
      <div id="form-scene" className={`${styles.sceneBlock} ${styles.sceneForm}`}>
        <div className={styles.sceneContainer}>
          <div className={styles.sceneGridMirror}>
            
            {/* Left Column: Narrative Info (38.2%) */}
            <div className={styles.infoCol}>
              <h4 className={styles.sceneTitleText}>拟物表单与输入反馈</h4>
              <p className={styles.sceneDesc}>
                表单呈现为凹陷在系统底板中的实体界面，所有的交互状态变化都通过明确的光影与位移来传达，避免产生任何认知歧义。
              </p>
              
              <ul className={styles.featurePoints}>
                <li>
                  <strong>凹陷雕刻质感</strong>
                  <span>输入框与选择下拉菜单采用向内凹陷的阴影（Pressed Inset Shadow），形成纸张雕刻槽。</span>
                </li>
                <li>
                  <strong>物理触压按钮</strong>
                  <span>登录按钮采用饱满的微立体高光，按压时产生向下的位移和阴影收敛，反馈极其可信。</span>
                </li>
                <li>
                  <strong>物理分段控制</strong>
                  <span>SegmentedControl 带有明显的滑块位移与内凹刻度，阻尼动作行云流水。</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Visual Mockup (61.8%) */}
            <div className={styles.mockupCol}>
              <div className={styles.formRowGrid}>
                
                {/* Form Card */}
                <Card title="验证码安全登录" padding="lg" className={styles.showcaseFormCard}>
                  <div className={styles.formContainer}>
                    {/* Dropdown Select */}
                    <Select 
                      label="国家和地区" 
                      options={[
                        { label: '中国', value: 'CN' },
                        { label: '阿尔巴尼亚', value: 'AL' },
                        { label: '阿尔及利亚', value: 'DZ' },
                        { label: '阿富汗', value: 'AF' },
                        { label: '阿根廷', value: 'AR' },
                        { label: '阿拉伯联合酋长国', value: 'AE' }
                      ]}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                    />

                    {/* Phone Input */}
                    <div className={styles.phoneInputContainer}>
                      <span className={styles.countryCode}>
                        {selectedCountry === 'CN' ? '+86' :
                         selectedCountry === 'AL' ? '+355' :
                         selectedCountry === 'DZ' ? '+213' :
                         selectedCountry === 'AF' ? '+93' :
                         selectedCountry === 'AR' ? '+54' :
                         selectedCountry === 'AE' ? '+971' : '+86'}
                      </span>
                      <input 
                        type="tel" 
                        className={styles.phoneInput} 
                        placeholder="请输入手机号" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>

                    <Input type="password" placeholder="请输入密码" defaultValue="smartisan2026" />

                    <div className={styles.formHelperRow}>
                      <Checkbox label="自动登录" defaultChecked />
                      <a href="#" className={styles.formLink} onClick={(e) => e.preventDefault()}>忘记密码</a>
                    </div>

                    <Button 
                      variant="primary" 
                      className={!phone.trim() ? styles.smsSubmitButtonDisabled : styles.smsSubmitButton} 
                      disabled={!phone.trim()}
                      onClick={() => toast({ title: '登录成功', description: '您已成功登录系统。', variant: 'success' })}
                    >
                      登录
                    </Button>
                    
                    <div className={styles.socialDivider} />
                    <div className={styles.termsAgreement}>
                      登录即代表您同意我们的 <a href="#" className={styles.termsLink}>用户协议</a> 和 <a href="#" className={styles.termsLink}>隐私政策</a>
                    </div>
                  </div>
                </Card>

                {/* Auxiliary Inputs Card */}
                <Card title="选项与信息备注" padding="lg" className={styles.showcaseFormCard}>
                  <div className={styles.optionsContainer}>
                    <div>
                      <span className={styles.fieldLabel}>物理分段选项</span>
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
                      <span className={styles.fieldLabel}>多行说明</span>
                      <Textarea 
                        placeholder="输入需要保留换行的说明文本..." 
                        defaultValue="锤子便签式的长文本输入区，独立于单行输入框，带来经典的纸张输入质感。" 
                      />
                    </div>

                    <div>
                      <span className={styles.fieldLabel}>容器与进度条</span>
                      <div className={styles.progressRow}>
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
                </Card>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scene 3: Feedback, Overlays, and Modals Showcase */}
      <div id="feedback-scene" className={`${styles.sceneBlock} ${styles.sceneFeedback}`}>
        <div className={styles.sceneContainer}>
          <div className={styles.sceneFeedbackLayout}>
            
            <div className={styles.sceneCenterHeader}>
              <h4 className={styles.sceneTitleText}>层级、浮层与弹出对话框</h4>
              <p className={styles.sceneDesc}>
                系统反馈通过 Z 轴的高度差异建立轻重缓急的秩序。Toast 位于浅层，而带有坚实阴影的 Modal 和 Dialog 则代表了最高优先级的物理打断。
              </p>
            </div>

            {/* Layout Grid */}
            <div className={styles.feedbackShowcaseGrid}>
              
              {/* Box 1: Inline Feedback Components */}
              <div className={styles.feedbackCardWrapper}>
                <Card title="状态与反馈组件" padding="lg">
                  <div className={styles.feedbackContainer}>
                    <Alert title="页面状态通知" tone="info" action={<Badge variant="primary">新</Badge>}>
                      页面级的重要信息条，用低饱和度的彩色质感柔和呈现。
                    </Alert>

                    <div className={styles.buttonsGrid}>
                      <Button
                        variant="primary"
                        onClick={() => toast({ title: '已保存', description: '系统设置已成功同步。', variant: 'success' })}
                      >
                        提示 Toast
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => toast({
                          title: '删除失败',
                          description: '网络连接超时，请重试。',
                          variant: 'danger',
                          action: { label: '重试', onClick: () => undefined, altText: '重试操作' },
                        })}
                      >
                        动作型 Toast
                      </Button>
                      <Button variant="secondary" loading>同步中</Button>
                    </div>

                    <div className={styles.popoversRow}>
                      <Tooltip content="轻量级悬停信息提示框">
                        <Button variant="secondary" size="sm">悬停提示</Button>
                      </Tooltip>
                      
                      <Popover
                        trigger={<Button variant="secondary" size="sm">展开气泡</Button>}
                        align="start"
                      >
                        <div className={styles.popoverInner}>
                          <strong className={styles.popoverTitle}>定位锚定框</strong>
                          <span className={styles.popoverDesc}>
                            适用于临时出现的菜单、卡片或信息流说明，不会粗暴地截断当前的屏幕焦点。
                          </span>
                        </div>
                      </Popover>

                      <span className={styles.syncStatus}>
                        <Spinner size="sm" /> 正在加载
                      </span>

                      <div className={styles.badges}>
                        <Badge variant="neutral">草稿</Badge>
                        <Badge variant="danger" count={12} />
                        <Badge variant="success" dot />
                      </div>
                    </div>

                    <Tabs
                      ariaLabel="反馈选项卡"
                      items={[
                        {
                          id: 'notice',
                          label: '原则',
                          content: <Alert tone="success" title="轻重分离">低优先级使用 Toast 和 Tooltip，高优先级使用 Dialog。</Alert>,
                        },
                        {
                          id: 'loading',
                          label: '骨架',
                          content: (
                            <div style={{ display: 'grid', gap: '10px' }}>
                              <Skeleton variant="text" rows={2} />
                              <Skeleton height="36px" />
                            </div>
                          ),
                        }
                      ]}
                    />
                  </div>
                </Card>
              </div>

              {/* Box 2: Modals & Dialogs Triggers */}
              <div className={styles.feedbackCardWrapper}>
                <Card title="官方物理弹窗校准" padding="lg" className={styles.fullHeightCard}>
                  <div className={styles.modalTriggersContainer}>
                    <p className={styles.modalIntroText}>
                      Smartisan OS 让人最为心动的体验来自物理弹窗。带有白色描边及实体按钮的悬浮面板，仿佛是将玻璃与金属重叠放置于屏幕之上。
                    </p>
                    
                    <div className={styles.modalButtonsGrid}>
                      <Button variant="secondary" onClick={() => setIsDialogOpen(true)} className={styles.triggerButton}>
                        展开实体悬浮弹窗 (Dialog)
                      </Button>
                      <Button variant="danger" onClick={() => setIsActionSheetOpen(true)} className={styles.triggerButton}>
                        展开底部操作菜单 (ActionSheet)
                      </Button>
                      <Button variant="secondary" onClick={() => showProgressDialog('light')} className={styles.triggerButton}>
                        官方白色进度弹窗
                      </Button>
                      <Button variant="secondary" onClick={() => showProgressDialog('dark')} className={styles.triggerButton}>
                        官方深色进度弹窗
                      </Button>
                      <Button variant="secondary" disabled className={styles.triggerButton}>
                        物理禁用态按钮
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Overlay Modal Systems */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        title="物理悬浮弹窗"
      >
        这是一个仿 Smartisan 风格的悬浮弹窗。请注意观察右上角那个带有白色描边和深色底色的经典实体关闭按钮，以及卡片周围的高光切边。
      </Dialog>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        title="官方 MenuDialog 校准"
        actions={[
          { label: '保存设置并同步', variant: 'primary' },
          { label: '彻底删除该配置', variant: 'danger' },
          { label: '保持当前状态' },
        ]}
      >
        底部贴边、强遮罩阴影、精致的标题栏和高透光实体按钮，这些共同构成了 SmartisanOS MenuDialog 的独有特征。
      </ActionSheet>

      <ProgressDialog
        isOpen={isProgressDialogOpen}
        tone={progressDialogTone}
        title="正在同步云端设置"
        message="请稍候，系统正在处理底板物理参数配置"
      />
    </section>
  );
};
