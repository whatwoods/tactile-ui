import { useState } from 'react';
import { Button } from './components/Button/Button';
import { Switch } from './components/Switch/Switch';
import { Input } from './components/Input/Input';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Radio } from './components/Radio/Radio';
import { Card } from './components/Card/Card';
import { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
import { Select } from './components/Select/Select';
import { Slider } from './components/Slider/Slider';
import { Dialog } from './components/Dialog/Dialog';
import { SideNav } from './components/SideNav/SideNav';
import { Header } from './components/Header/Header';

function App() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('2');
  
  // States for the 4-control card layout
  const [isMute, setIsMute] = useState(true);
  const [stepValue, setStepValue] = useState(0);
  const [volume, setVolume] = useState(30);
  const [brightness, setBrightness] = useState(80);

  const sideNavItems = [
    { id: 'switch-section', label: '基础控件' },
    { id: 'sliders-section', label: '滑块家族' },
    { id: 'dialog-section', label: '悬浮弹窗' }
  ];

  return (
    <div style={{ 
      minHeight: '200vh', /* Make it scrollable to test the scrollbar and back-to-top */
      background: 'var(--s-texture-bg)',
      paddingBottom: '40px'
    }}>
      <SideNav 
        items={sideNavItems} 
        activeId={activeNav} 
        onChange={setActiveNav} 
        onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      {/* Sticky Header Navigation */}
      <Header />

      <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <Card title="忘记密码" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Select 
              label="国家和地区"
              placeholder="请选择国家和地区"
              defaultValue="cn"
              options={[
                { label: '中国 (China)', value: 'cn' },
                { label: '美国 (United States)', value: 'us' },
                { label: '日本 (Japan)', value: 'jp' },
                { label: '英国 (United Kingdom)', value: 'uk' },
                { label: '法国 (France)', value: 'fr' },
                { label: '德国 (Germany)', value: 'de' }
              ]}
            />
            
            <Input label="手机号" placeholder="请输入注册手机号" />
            <Input label="Password" type="password" error="Incorrect password" defaultValue="hunter2" />
            
            <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
              <Checkbox label="Remember Me" defaultChecked />
              <Checkbox label="Subscribe" />
              <Checkbox label="Disabled" disabled />
            </div>

            {/* Deleted Radio selection group */}
          </div>
        </Card>
        
        {/* Switch Section */}
        <div id="switch-section">
          <Card title="基础控件" padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: '#333' }}>系统通知</span>
              <Switch 
                checked={isNotificationsEnabled} 
                onChange={(checked) => setIsNotificationsEnabled(checked)} 
              />
            </div>
            
            <div style={{ height: '1px', background: '#EAEAEA', margin: '24px 0' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Select 
                label="国家和地区"
                placeholder="请选择国家和地区"
                defaultValue="cn"
                options={[
                  { label: '中国 (China)', value: 'cn' },
                  { label: '美国 (United States)', value: 'us' },
                  { label: '日本 (Japan)', value: 'jp' },
                  { label: '英国 (United Kingdom)', value: 'uk' },
                  { label: '法国 (France)', value: 'fr' },
                  { label: '德国 (Germany)', value: 'de' }
                ]}
              />
              
              <SegmentedControl 
                options={[
                  { label: '侧按键设定', value: '1' },
                  { label: '熄屏两侧按键挤压', value: '2' },
                  { label: '亮屏两侧按键挤压', value: '3' }
                ]} 
                defaultValue="1"
              />
            </div>
          </Card>
        </div>

        {/* Sliders Section (The Perfect 4-Control Layout) */}
        <div id="sliders-section">
          <Card padding="none">
            <div style={{ 
              padding: '36px 36px', 
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* 1. Title & Switch Row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: isMute ? '28px' : '0px',
                padding: '0 8px'
              }}>
                <span style={{ 
                  fontSize: '26px', 
                  fontWeight: 400, 
                  color: '#333333',
                  letterSpacing: '-0.5px',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
                }}>
                  静音
                </span>
                <Switch 
                  checked={isMute} 
                  onChange={(checked) => setIsMute(checked)} 
                />
              </div>

              {/* 2. Stepped Slider Row (Mute duration selection, shown only when muted) */}
              {isMute ? (
                <div style={{ 
                  paddingBottom: '24px', 
                  borderBottom: '1px solid #ECECEC', 
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
                /* Divider line when unmuted, separating Switch row and Volume slider */
                <div style={{ 
                  borderBottom: '1px solid #ECECEC', 
                  margin: '24px 0' 
                }}></div>
              )}

              {/* 3. Volume Slider Row (Grey fill when muted, Blue fill when unmuted) */}
              <div style={{ 
                paddingBottom: '24px', 
                borderBottom: '1px solid #ECECEC', 
                marginBottom: '24px' 
              }}>
                <Slider 
                  value={volume}
                  onChange={(val) => setVolume(val)}
                  fillColor={isMute ? 'grey' : 'blue'}
                  iconLeft={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scale(0.95)' }}>
                      <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
                      <line x1="11" y1="18" x2="13" y2="18" />
                      <path d="M3 8a8.5 8.5 0 0 0 0 8M1 10a11.5 11.5 0 0 0 0 4" />
                      <path d="M21 8a8.5 8.5 0 0 1 0 8M23 10a11.5 11.5 0 0 1 0 4" />
                    </svg>
                  }
                  iconRight={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  }
                />
              </div>

              {/* 4. Brightness Slider Row (Blue Fill) */}
              <div style={{ paddingBottom: '8px' }}>
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
        </div>



        <div id="dialog-section">
          <Card title="弹窗与按钮" padding="lg">
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>打开提示弹窗</Button>
              <Button variant="primary">主操作按钮</Button>
              <Button variant="secondary" disabled>禁用状态</Button>
            </div>
          </Card>
        </div>

        {/* The Dialog */}
        <Dialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          title="系统提示"
        >
          这是一个 Smartisan 风格的悬浮弹窗。请注意观察右上角那个带有白色描边和深灰色底色的经典实体关闭按钮。
        </Dialog>
      </main>
    </div>
  );
}

export default App;
