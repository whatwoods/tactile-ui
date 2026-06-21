import React, { useState } from 'react';
import styles from './ComponentGallery.module.css';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Switch } from '../Switch/Switch';
import { Slider } from '../Slider/Slider';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Select } from '../Select/Select';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { Tabs } from '../Tabs/Tabs';
import { Alert } from '../Alert/Alert';
import { Badge } from '../Badge/Badge';
import { Progress } from '../Progress/Progress';
import { Spinner } from '../Spinner/Spinner';
import { Skeleton } from '../Skeleton/Skeleton';
import { Tooltip } from '../Tooltip/Tooltip';
import { Popover } from '../Popover/Popover';
import { Icon } from '../Icon/Icon';
import { List } from '../List/List';
import { SettingItem } from '../SettingItem/SettingItem';

interface GroupData {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

const GROUPS: GroupData[] = [
  {
    id: 'controls',
    title: '物理控制 (Controls)',
    description: '界面交互的核心。默认态外凸，按压态内凹——这是严密的光影语法，不是随意的视觉装饰。',
    count: 3,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    id: 'inputs',
    title: '表单输入 (Inputs)',
    description: '可写入的凹槽。默认态轻微内凹，聚焦态边框增强——层级来自光影，不来自过度修饰。',
    count: 5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    )
  },
  {
    id: 'navigation',
    title: '导航标签 (Navigation)',
    description: '层级之间的切换。使用统一的比例网格与实体块位移，确保滑动过程符合物理惯性。',
    count: 1,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    )
  },
  {
    id: 'feedback',
    title: '状态反馈 (Feedback)',
    description: '物理互动的回响。状态颜色遵循统一的灰度与饱和度阶梯，绝不喧宾夺主。',
    count: 5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    id: 'overlays',
    title: '悬停浮层 (Overlays)',
    description: '更高的物理层级。通过 shadow-3 和 shadow-4 投影定义 Z 轴高度，与底层拉开清晰距离。',
    count: 2,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    )
  },
  {
    id: 'base',
    title: '基本实体 (Base UI)',
    description: '构成界面的原子。它们在 4px 网格上构建，遵守黄金比例，是秩序生长的起点。',
    count: 5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  }
];

export const ComponentGallery: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    controls: true // Expand the first one by default
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // State values for live components
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoSlider, setDemoSlider] = useState(45);
  const [demoSegment, setDemoSegment] = useState('left');
  const [demoCheckbox, setDemoCheckbox] = useState(true);
  const [demoRadio, setDemoRadio] = useState('yes');

  return (
    <section id="gallery-section" className={styles.gallerySection}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>原子组件库详览</h3>
          <p className={styles.sectionSubtitle}>
            严整的设计令牌驱动着每一个参数。点击展开各分类，查看这些被 AI Coding Agent 深刻理解的克制实体。
          </p>
        </div>

        {/* Gallery Stack */}
        <div className={styles.galleryStack}>
          {GROUPS.map((group) => {
            const isOpen = !!openGroups[group.id];
            return (
              <div 
                key={group.id} 
                className={`${styles.groupCard} ${isOpen ? styles.groupCardOpen : ''}`}
              >
                {/* Header Row */}
                <button 
                  className={styles.groupHeader} 
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.headerLeft}>
                    <div className={styles.groupIconWrapper}>{group.icon}</div>
                    <div className={styles.groupInfo}>
                      <h4 className={styles.groupTitleText}>{group.title}</h4>
                      <p className={styles.groupDescText}>{group.description}</p>
                    </div>
                  </div>
                  <div className={styles.headerRight}>
                    <Badge variant="neutral" className={styles.badgeCount}>
                      {group.count} 组件
                    </Badge>
                    <div className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Collapsible Panel */}
                <div className={`${styles.collapsiblePanel} ${isOpen ? styles.panelExpanded : ''}`}>
                  <div className={styles.panelInner}>
                    <div className={styles.demoGrid}>
                      
                      {/* Render components based on group ID */}
                      {group.id === 'controls' && (
                        <>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Switch 开关</span>
                            <div className={styles.demoBox}>
                              <Switch checked={demoSwitch} onChange={setDemoSwitch} />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Slider 滑动条</span>
                            <div className={styles.demoBox}>
                              <Slider value={demoSlider} onChange={setDemoSlider} fillColor="blue" />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>SegmentedControl 分段选择</span>
                            <div className={styles.demoBox}>
                              <SegmentedControl 
                                options={[
                                  { label: '极速', value: 'left' },
                                  { label: '均衡', value: 'mid' },
                                  { label: '无损', value: 'right' }
                                ]} 
                                value={demoSegment}
                                onChange={setDemoSegment}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {group.id === 'inputs' && (
                        <>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Input 文本框</span>
                            <div className={styles.demoBox}>
                              <Input placeholder="请填写用户名..." />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Textarea 多行文本</span>
                            <div className={styles.demoBox}>
                              <Textarea placeholder="请在此输入您的反馈意见..." rows={2} />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Select 选择器</span>
                            <div className={styles.demoBox}>
                              <Select 
                                options={[
                                  { label: '北京', value: 'BJ' },
                                  { label: '上海', value: 'SH' },
                                  { label: '深圳', value: 'SZ' }
                                ]}
                                defaultValue="BJ"
                              />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Checkbox 复选框</span>
                            <div className={styles.demoBox}>
                              <Checkbox 
                                label="我已认真阅读并接受上述条款" 
                                checked={demoCheckbox}
                                onChange={(e) => setDemoCheckbox(e.target.checked)}
                              />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Radio 单选框</span>
                            <div className={styles.demoBox}>
                              <div style={{ display: 'flex', gap: '16px' }}>
                                <Radio 
                                  label="是" 
                                  name="demo-radio"
                                  checked={demoRadio === 'yes'}
                                  onChange={() => setDemoRadio('yes')}
                                />
                                <Radio 
                                  label="否" 
                                  name="demo-radio"
                                  checked={demoRadio === 'no'}
                                  onChange={() => setDemoRadio('no')}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {group.id === 'navigation' && (
                        <div className={styles.fullWidthDemoItem}>
                          <span className={styles.demoLabel}>Tabs 标签页</span>
                          <div className={styles.demoBox}>
                            <Tabs 
                              items={[
                                { id: 'tab1', label: '面板详情', content: <p className={styles.tabPara}>展示卡片及当前详细的配置参数流信息。</p> },
                                { id: 'tab2', label: '版本历史', content: <p className={styles.tabPara}>v1.2.4 (2026-06) — 新增物理阻尼滑条物理质感微调校准。</p> },
                                { id: 'tab3', label: '授权范围', content: <p className={styles.tabPara}>开源授权使用协议，不允许商业混剪打包二次分发。</p> }
                              ]}
                            />
                          </div>
                        </div>
                      )}

                      {group.id === 'feedback' && (
                        <>
                          <div className={styles.fullWidthDemoItem}>
                            <span className={styles.demoLabel}>Alert 警告框</span>
                            <div className={styles.demoBox}>
                              <Alert tone="warning" title="磁盘空间警告">
                                系统剩余磁盘空间已低于 10%，请及时清理冗余缓存资源文件。
                              </Alert>
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Badge 徽章</span>
                            <div className={styles.demoBox}>
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Badge variant="primary">在线</Badge>
                                <Badge variant="danger" count={99} />
                                <Badge variant="success" dot />
                              </div>
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Progress 进度条</span>
                            <div className={styles.demoBox}>
                              <Progress value={74} />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Spinner 加载指示</span>
                            <div className={styles.demoBox}>
                              <Spinner size="md" />
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Skeleton 骨架屏</span>
                            <div className={styles.demoBox}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                <Skeleton variant="text" />
                                <Skeleton height="20px" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {group.id === 'overlays' && (
                        <>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Tooltip 文字提示</span>
                            <div className={styles.demoBox}>
                              <Tooltip content="物理引擎重置按钮，谨慎触发">
                                <Button variant="secondary" size="sm">鼠标悬停</Button>
                              </Tooltip>
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Popover 气泡卡片</span>
                            <div className={styles.demoBox}>
                              <Popover trigger={<Button variant="secondary" size="sm">点击触发</Button>}>
                                <div style={{ padding: '8px', maxWidth: '200px' }}>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--s-color-text-primary)' }}>气泡浮层标题</h6>
                                  <p style={{ margin: '0', fontSize: '11px', color: 'var(--s-color-text-secondary)', lineHeight: '1.4' }}>这里是可以填充自定义交互子元素的气泡内容区。</p>
                                </div>
                              </Popover>
                            </div>
                          </div>
                        </>
                      )}

                      {group.id === 'base' && (
                        <>
                          <div className={styles.fullWidthDemoItem}>
                            <span className={styles.demoLabel}>Button 物理按钮</span>
                            <div className={styles.demoBox}>
                              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Button variant="primary">主要动作</Button>
                                <Button variant="secondary">次要选项</Button>
                                <Button variant="danger">危险指令</Button>
                                <Button variant="secondary" loading>加载反馈</Button>
                                <Button variant="secondary" disabled>禁用状态</Button>
                              </div>
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Icon 物理图标容器</span>
                            <div className={styles.demoBox}>
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <Icon size="sm" tone="primary">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                </Icon>
                                <Icon size="md" tone="muted" surface>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </Icon>
                              </div>
                            </div>
                          </div>
                          <div className={styles.demoItem}>
                            <span className={styles.demoLabel}>Card 物理面板卡片</span>
                            <div className={styles.demoBox}>
                              <div style={{ width: '100%' }}>
                                <Card title="卡片容器标题" padding="sm">
                                  <span style={{ fontSize: '12px', color: 'var(--s-color-text-secondary)' }}>内置微高光立体边缘。</span>
                                </Card>
                              </div>
                            </div>
                          </div>
                          <div className={styles.fullWidthDemoItem}>
                            <span className={styles.demoLabel}>List & SettingItem 物理列表组</span>
                            <div className={styles.demoBox}>
                              <div style={{ width: '100%' }}>
                                <List>
                                  <SettingItem 
                                    title="极简物理列表组"
                                    summary="内置微渐变和按压凹凸"
                                    accessory="chevron"
                                    onClick={() => alert('点击列表项')}
                                  />
                                </List>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
