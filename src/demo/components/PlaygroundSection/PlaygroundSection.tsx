import React, { useState } from 'react';
import styles from './PlaygroundSection.module.css';
import { Card } from '../../../components/Card/Card';
import { Switch } from '../../../components/Switch/Switch';
import { Slider } from '../../../components/Slider/Slider';
import { SettingItem } from '../../../components/SettingItem/SettingItem';
import { List } from '../../../components/List/List';
import { ListItem } from '../../../components/List/ListItem';
import { Input } from '../../../components/Input/Input';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Button } from '../../../components/Button/Button';
import { SegmentedControl } from '../../../components/SegmentedControl/SegmentedControl';
import { Icon } from '../../../components/Icon/Icon';
import { Progress } from '../../../components/Progress/Progress';
import { Alert } from '../../../components/Alert/Alert';
import { Badge } from '../../../components/Badge/Badge';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Popover } from '../../../components/Popover/Popover';
import { Spinner } from '../../../components/Spinner/Spinner';
import { Textarea } from '../../../components/Textarea/Textarea';
import { Tabs } from '../../../components/Tabs/Tabs';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import { useToast } from '../../../components/Toast/useToast';
import { Dialog } from '../../../components/Dialog/Dialog';
import { ActionSheet } from '../../../components/ActionSheet/ActionSheet';
import { ProgressDialog } from '../../../components/ProgressDialog/ProgressDialog';
import { Select } from '../../../components/Select/Select';

interface PlaygroundSectionProps {
  isMute: boolean;
  setIsMute: (mute: boolean) => void;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({ isMute, setIsMute }) => {
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
  const [slideSearch, setSlideSearch] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('classic');

  const showProgressDialog = (tone: 'light' | 'dark' = 'light') => {
    setProgressDialogTone(tone);
    setIsProgressDialogOpen(true);
    window.setTimeout(() => setIsProgressDialogOpen(false), 1400);
  };

  return (
    <section id="playground-section" className={styles.playgroundSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>每一次触碰，都有回应</h3>
          <p className={styles.sectionSubtitle}>
            拨动开关时齿轮咬合的触感，滑块经过刻度时指尖的阻尼，复选框落下时那一声微不可察的「咔」——这些微小的物理承诺，构成了界面无声的可信度。
          </p>
        </div>

        {/* Categories of Demos */}
        <div className={styles.categories}>
          
          {/* Category 1: 物理控制 (Controls) */}
          <div id="controls-group" className={styles.categoryGroup}>
            <h4 className={styles.categoryTitle}>基础物理控制 (Controls)</h4>
            <div className={styles.cardsGrid}>
              
              {/* Card 1: Switch & Sliders */}
              <Card title="静音与阻尼滑块" padding="none">
                <div className={styles.cardContentLayout}>
                  {/* Row 1: Switch */}
                  <div className={styles.switchRow}>
                    <span className={styles.controlLabel}>系统静音 (物理开关)</span>
                    <Switch checked={isMute} onChange={(checked) => setIsMute(checked)} />
                  </div>

                  {/* Row 2: Volume Slider */}
                  <div className={styles.sliderRow}>
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

                  {/* Row 3: Brightness Slider */}
                  <div className={styles.sliderRow}>
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

              {/* Card 2: Setting Items */}
              <Card title="SettingItem 设置项" onBack={() => undefined} padding="sm" className={styles.referenceCard}>
                <div className={styles.settingGroupsContainer}>
                  <div>
                    <h5 className={styles.groupTitle}>无线局域网</h5>
                    <List className={styles.referenceList}>
                      <SettingItem
                        className={styles.referenceSettingItem}
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
                        className={styles.referenceSettingItem}
                        title="经典提示音"
                        summary="默认系统反馈"
                        accessory="check"
                        selected={selectedSound === 'classic'}
                        onClick={() => setSelectedSound('classic')}
                      />
                      <SettingItem
                        className={styles.referenceSettingItem}
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
                        className={styles.referenceSettingItem}
                        title="解锁动画"
                        accessory="switch"
                        checked={unlockAnimation}
                        onCheckedChange={setUnlockAnimation}
                      />
                    </List>
                    <p className={styles.groupDescription}>允许桌面解锁后播放缩放动画</p>
                  </div>

                  <div>
                    <h5 className={styles.groupTitle}>启用下滑搜索</h5>
                    <List className={styles.referenceList}>
                      <SettingItem
                        className={styles.referenceSettingItem}
                        title="启用下滑搜索"
                        accessory="switch"
                        checked={slideSearch}
                        onCheckedChange={setSlideSearch}
                      />
                    </List>
                    <p className={styles.groupDescription}>在桌面上下滑呼出搜索，即可快速搜索应用</p>
                  </div>
                </div>
              </Card>

              {/* Card 3: List Items */}
              <Card title="ListItem 列表项" onBack={() => undefined} padding="sm" className={styles.referenceCard}>
                <h5 className={styles.groupTitle}>关于我们</h5>
                <List className={styles.referenceList}>
                  <ListItem
                    className={styles.referenceListItem}
                    title="编译作者"
                    value={<span className={styles.referenceListValue}>项目作者-Way</span>}
                    accessory="none"
                  />
                  <ListItem
                    className={styles.referenceListItem}
                    title="新浪微博"
                    value={<span className={styles.referenceListValue}>GitHub-whatwoods</span>}
                    accessory="none"
                  />
                  <ListItem
                    className={styles.referenceListItem}
                    title="灵感来源"
                    value={<span className={styles.referenceListValue}>锤子科技</span>}
                    accessory="none"
                  />
                </List>
              </Card>

            </div>
          </div>

          {/* Category 2: 拟物表单 (Forms) */}
          <div id="forms-group" className={styles.categoryGroup}>
            <h4 className={styles.categoryTitle}>拟物表单与输入 (Forms & Inputs)</h4>
            <div className={styles.cardsGrid}>
              
              {/* Card 1: Account Login Form */}
              <Card id="form-card" title="短信验证码登录" padding="lg">
                <div className={styles.formContainer}>
                  {/* Dropdown for Country & Region */}
                  <Select 
                    label="国家和地区" 
                    options={[
                      { label: '中国', value: 'CN' },
                      { label: '阿尔巴尼亚', value: 'AL' },
                      { label: '阿尔及利亚', value: 'DZ' },
                      { label: '阿富汗', value: 'AF' },
                      { label: '阿根廷', value: 'AR' },
                      { label: '阿拉伯联合酋长国', value: 'AE' },
                      { label: '阿鲁巴', value: 'AW' },
                      { label: '阿曼', value: 'OM' }
                    ]}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />

                  {/* Phone Input with Inline Prefix */}
                  <div className={styles.phoneInputContainer}>
                    <span className={styles.countryCode}>
                      {selectedCountry === 'CN' ? '+86' :
                       selectedCountry === 'AL' ? '+355' :
                       selectedCountry === 'DZ' ? '+213' :
                       selectedCountry === 'AF' ? '+93' :
                       selectedCountry === 'AR' ? '+54' :
                       selectedCountry === 'AE' ? '+971' :
                       selectedCountry === 'AW' ? '+297' :
                       selectedCountry === 'OM' ? '+968' : '+86'}
                    </span>
                    <input 
                      type="tel" 
                      className={styles.phoneInput} 
                      placeholder="手机号" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>

                  {/* Password Input (always shown) */}
                  <Input type="password" placeholder="请输入密码" defaultValue="wl000625" />

                  {/* Helper Row (always shown) */}
                  <div className={styles.formHelperRow}>
                    <Checkbox label="自动登录" defaultChecked />
                    <div className={styles.formLinks}>
                      <a href="#" className={styles.formLink} onClick={(e) => e.preventDefault()}>找回密码</a>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className={!phone.trim() ? styles.smsSubmitButtonDisabled : styles.smsSubmitButton} 
                    disabled={!phone.trim()}
                    onClick={() => toast({ title: '登录成功', description: '您已成功登录系统。', variant: 'success' })}
                  >
                    登录
                  </Button>

                  {/* Terms Agreement */}
                  <div className={styles.socialDivider} />
                  <div className={styles.termsAgreement}>
                    登录代表你已同意 <a href="#" className={styles.termsLink}>用户协议</a> 和 <a href="#" className={styles.termsLink}>隐私政策</a>
                  </div>
                </div>
              </Card>

              {/* Card 2: Segmented Controls & Textarea */}
              <Card title="选项与说明输入" padding="lg">
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
                      label="多行说明" 
                      placeholder="输入需要保留换行的说明文本" 
                      defaultValue="锤子便签式的长文本，需要独立于单行 Input。" 
                    />
                  </div>

                  <div>
                    <span className={styles.fieldLabel}>图标容器与条形进度</span>
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
                </div>
              </Card>

            </div>
          </div>

          {/* Category 3: 反馈与浮层 (Feedback) */}
          <div id="feedback-group" className={styles.categoryGroup}>
            <h4 className={styles.categoryTitle}>反馈、浮层与对话框 (Feedback & Overlay)</h4>
            <div className={styles.cardsGrid}>
              
              {/* Card 1: Feedback Demos */}
              <Card title="反馈、浮层与加载态" padding="lg">
                <div className={styles.feedbackContainer}>
                  <Alert title="系统横幅" tone="info" action={<Badge variant="primary">新</Badge>}>
                    用于页面级状态提示，保持可见但不打断当前任务。
                  </Alert>

                  <div className={styles.buttonsGrid}>
                    <Button
                      variant="primary"
                      onClick={() => toast({ title: '已保存', description: '设置已同步到当前设备。', variant: 'success' })}
                    >
                      触发 Toast
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => toast({
                        title: '删除失败',
                        description: '网络连接中断，请稍后重试。',
                        variant: 'danger',
                        action: { label: '重试', onClick: () => undefined, altText: '重试删除操作' },
                      })}
                    >
                      操作型 Toast
                    </Button>
                    <Button variant="secondary" loading>正在保存</Button>
                  </div>

                  <div className={styles.popoversRow}>
                    <Tooltip content="可复用 Tooltip，适合图标按钮 and 截断文本">
                      <Button variant="secondary" size="sm">悬停提示</Button>
                    </Tooltip>
                    
                    <Popover
                      trigger={<Button variant="secondary" size="sm">打开 Popover</Button>}
                      align="start"
                    >
                      <div className={styles.popoverInner}>
                        <strong className={styles.popoverTitle}>锚定浮层</strong>
                        <span className={styles.popoverDesc}>
                          用于轻量表单、说明或快捷操作，不替代 MenuDialog。
                        </span>
                      </div>
                    </Popover>

                    <span className={styles.syncStatus}>
                      <Spinner size="sm" /> 同步中
                    </span>

                    <div className={styles.badges}>
                      <Badge variant="neutral">草稿</Badge>
                      <Badge variant="danger" count={128} />
                      <Badge variant="success" dot />
                    </div>
                  </div>

                  <Tabs
                    ariaLabel="反馈示例"
                    items={[
                      {
                        id: 'notice',
                        label: '提示',
                        content: <Alert tone="success" title="状态已更新">短消息使用 Toast，页面级消息使用 Alert。</Alert>,
                      },
                      {
                        id: 'loading',
                        label: '加载',
                        content: (
                          <div style={{ display: 'grid', gap: '10px' }}>
                            <Skeleton variant="text" rows={3} />
                            <Skeleton height="var(--s-size-button-lg-min-height)" />
                          </div>
                        ),
                      },
                      {
                        id: 'disabled',
                        label: '禁用',
                        disabled: true,
                        content: null,
                      },
                    ]}
                  />
                </div>
              </Card>

              {/* Card 2: Interactive Modals triggers */}
              <Card title="拟物对话框调演" padding="lg">
                <div className={styles.modalTriggersContainer}>
                  <p className={styles.modalIntroText}>
                    Smartisan OS 核心的高级物理体验来源于弹窗。点击下方按钮展示各种风格的模态/半模态弹窗交互。
                  </p>
                  
                  <div className={styles.modalButtonsGrid}>
                    <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>展示悬浮弹窗</Button>
                    <Button variant="danger" onClick={() => setIsActionSheetOpen(true)}>展示底部操作菜单</Button>
                    <Button variant="secondary" onClick={() => showProgressDialog('light')}>展示官方进度弹窗</Button>
                    <Button variant="secondary" onClick={() => showProgressDialog('dark')}>展示深色进度弹窗</Button>
                    <Button variant="secondary" disabled>物理禁用按钮</Button>
                  </div>
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>

      {/* Overlay Modal Systems */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        title="系统提示"
      >
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
    </section>
  );
};
