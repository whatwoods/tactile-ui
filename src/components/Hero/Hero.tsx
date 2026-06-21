import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { Button } from '../Button/Button';
import { Switch } from '../Switch/Switch';


const MODES = [
  {
    name: 'TACTILE_OS',
    lines: ['SYS: TACTILE OS', 'DEPTH: 1.618px', 'TOUCH: ACTIVE'],
    desc: '让指尖重新记住按下去的感觉',
    led: 'green'
  },
  {
    name: 'AI_COPT',
    lines: ['AGT: GEMINI 3.5', 'INFERENCE: OK', 'TEMP: 36.5°C'],
    desc: '机器读懂规则，人类专注感受',
    led: 'blue'
  },
  {
    name: 'GOLDEN_R',
    lines: ['RATIO: 1.61803', 'GRID: 4px BASE', 'FLOW: HARMONIC'],
    desc: '万物生长的比例，界面呼吸的节奏',
    led: 'orange'
  }
];

export const Hero: React.FC = () => {
  const [power, setPower] = useState(true);
  const [modeIdx, setModeIdx] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [boost, setBoost] = useState(false);
  const [diag, setDiag] = useState(false);
  const [knobRotation, setKnobRotation] = useState(0);
  
  // Real-time counter to display dynamic values on screen
  const [ticks, setTicks] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Play click sound using Web Audio API
  const playClickSound = (pitch = 800, duration = 0.05, type: OscillatorType = 'sine') => {
    if (!audioEnabled || !power) return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      console.warn('Audio click failed');
    }
  };

  useEffect(() => {
    if (power) {
      timerRef.current = window.setInterval(() => {
        setTicks(t => (t + 1) % 9999);
      }, 300);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [power]);

  const handlePowerToggle = (nextPower: boolean) => {
    if (audioEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(nextPower ? 400 : 250, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch {
        console.warn('Power audio click failed');
      }
    }
    setPower(nextPower);
  };

  const handleKnobClick = () => {
    if (!power) return;
    playClickSound(900, 0.04, 'sine');
    setModeIdx(prev => (prev + 1) % MODES.length);
    setKnobRotation(prev => prev + 120);
  };

  const handleSoundBtn = () => {
    if (!power) return;
    const nextAudio = !audioEnabled;
    if (!nextAudio) {
      playClickSound(600, 0.04);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch {
        console.warn('Sound switch click failed');
      }
    }
    setAudioEnabled(nextAudio);
  };

  const handleBoostBtn = () => {
    if (!power) return;
    playClickSound(boost ? 700 : 1200, 0.06, 'sine');
    setBoost(!boost);
  };

  const handleDiagBtn = () => {
    if (!power) return;
    playClickSound(1000, 0.05, 'triangle');
    setDiag(!diag);
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLEDClass = () => {
    if (!power) return styles.ledOff;
    if (diag) return styles.ledDiag;
    const mode = MODES[modeIdx].name;
    if (mode === 'AI_COPT') return styles.ledBlue;
    if (mode === 'GOLDEN_R') return styles.ledOrange;
    return styles.ledGreen;
  };

  return (
    <section id="hero-section" className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Device Frame */}
        <div className={styles.heroConsole}>
          {/* Top Panel: Branding plate & LED */}
          <div className={styles.topPanel}>
            <div className={styles.brandPlate}>
              <span className={styles.brandTitle}>SMARTISAN UI</span>
              <span className={styles.brandModel}>MODEL T-400</span>
            </div>
            
            {/* Status indicators */}
            <div className={styles.ledGroup}>
              <span className={styles.ledLabel}>STATUS</span>
              <div className={`${styles.ledDot} ${getLEDClass()}`}></div>
            </div>
          </div>

          {/* Screen area */}
          <div className={`${styles.screenGroove} ${power ? styles.screenPowerOn : ''}`}>
            <div className={styles.screenInner}>
              <div className={styles.screenScanlines}></div>
              <div className={styles.screenGlare}></div>
              {power ? (
                <div className={`${styles.screenContent} ${boost ? styles.screenBoost : ''}`}>
                  <div className={styles.screenHeader}>
                    <span>MODE: {MODES[modeIdx].name}</span>
                    <span className={styles.flickerText}>[ RUNNING ]</span>
                  </div>
                  
                  {diag ? (
                    <div className={styles.diagLines}>
                      <div>ADC: {Math.sin(ticks * 0.1).toFixed(4)}</div>
                      <div>MEM: {(64.2 + (ticks % 10) * 0.1).toFixed(1)}%</div>
                      <div>LATENCY: {boost ? '18ms' : '45ms'}</div>
                    </div>
                  ) : (
                    <div className={styles.infoLines}>
                      {MODES[modeIdx].lines.map((line, i) => (
                        <div key={i} className={styles.screenLine}>{line}</div>
                      ))}
                    </div>
                  )}

                  <div className={styles.screenFooter}>
                    <span>SYS_CLK: {ticks.toString().padStart(4, '0')}</span>
                    <span>AUDIO: {audioEnabled ? 'ON' : 'OFF'}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.screenPowerOffText}>NO POWER</div>
              )}
            </div>
          </div>

          {/* Bottom Panel: Interactive Controls */}
          <div className={styles.controlsRow}>
            {/* Power Switch Section */}
            <div className={styles.controlGroup}>
              <span className={styles.controlTitle}>POWER</span>
              <div className={styles.switchWrapper}>
                <Switch checked={power} onChange={handlePowerToggle} />
              </div>
            </div>

            {/* Dial Selector Section */}
            <div className={styles.controlGroup}>
              <span className={styles.controlTitle}>SELECTOR</span>
              <div className={styles.dialWrapper}>
                <button 
                  className={styles.dialKnob} 
                  style={{ transform: `rotate(${knobRotation}deg)` }}
                  onClick={handleKnobClick}
                  disabled={!power}
                  aria-label="Change Mode"
                >
                  {/* Indicator notch */}
                  <div className={styles.dialNotch}></div>
                </button>
              </div>
            </div>

            {/* Push Keys Section */}
            <div className={styles.controlGroup}>
              <span className={styles.controlTitle}>KEYS</span>
              <div className={styles.buttonsRow}>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${styles.pushKey} ${audioEnabled ? styles.pushKeyActive : ''}`}
                  onClick={handleSoundBtn}
                  disabled={!power}
                  title="Toggle Audio Feedback"
                >
                  <span className={styles.keyLabel}>AUDIO</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${styles.pushKey} ${boost ? styles.pushKeyActive : ''}`}
                  onClick={handleBoostBtn}
                  disabled={!power}
                  title="Toggle Display Boost"
                >
                  <span className={styles.keyLabel}>BOOST</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${styles.pushKey} ${diag ? styles.pushKeyActive : ''}`}
                  onClick={handleDiagBtn}
                  disabled={!power}
                  title="Toggle Diagnostic Details"
                >
                  <span className={styles.keyLabel}>DIAG</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Text descriptions next to/below the console */}
        <div className={styles.heroTextContent}>
          <h2 className={styles.heroTitle}>让屏幕重新拥有手感</h2>
          <p className={styles.heroSubtitle}>
            有些东西正在从屏幕上消失——不是功能，而是触碰一个按钮时，指尖下方微微凹陷的确信感。
            Tactile UI 用光影的厚度、阴影的呼吸和黄金比例的韵脚，重新翻译那些物理世界里真正有价值的交互暗示。
            试着拨动左侧控制台上的开关。那个「咔」的瞬间，就是我们在意的全部。
          </p>
          
          <div className={styles.ctaButtonGroup}>
            <Button variant="primary" size="lg" className={styles.ctaButton} onClick={scrollToPlayground}>
              开始体验
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className={styles.ctaButton}
              onClick={() => {
                const designEl = document.getElementById('tokens-section');
                if (designEl) designEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              设计规范
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
