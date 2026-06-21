import React, { useState } from 'react';
import styles from './Chassis.module.css';
import { playPowerSound, playBuzzerSound } from '../../utils/sound';

export interface ChassisProps {
  title: string;
  model: string;
  ledColor?: 'green' | 'blue' | 'red' | 'orange' | 'cyan' | 'violet';
  audioEnabled: boolean;
  children: React.ReactNode;
  onPowerChange?: (power: boolean) => void;
  className?: string;
}

export const Chassis: React.FC<ChassisProps> = ({
  title,
  model,
  ledColor = 'green',
  audioEnabled,
  children,
  onPowerChange,
  className = '',
}) => {
  const [power, setPower] = useState(true);

  const handlePowerToggle = () => {
    const nextPower = !power;
    setPower(nextPower);
    playPowerSound(audioEnabled, nextPower);
    onPowerChange?.(nextPower);
  };

  const handleOfflineClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBuzzerSound(audioEnabled);
  };

  // Determine LED class
  const getLEDClass = () => {
    if (!power) return styles.ledOff;
    switch (ledColor) {
      case 'blue':
        return styles.ledBlue;
      case 'red':
        return styles.ledRed;
      case 'orange':
        return styles.ledOrange;
      case 'cyan':
        return styles.ledCyan;
      case 'violet':
        return styles.ledViolet;
      case 'green':
      default:
        return styles.ledGreen;
    }
  };

  return (
    <div className={`${styles.chassis} ${className}`}>
      {/* Chrome screws at four corners */}
      <div className={`${styles.screw} ${styles.screwTopLeft}`}></div>
      <div className={`${styles.screw} ${styles.screwTopRight}`}></div>
      <div className={`${styles.screw} ${styles.screwBottomLeft}`}></div>
      <div className={`${styles.screw} ${styles.screwBottomRight}`}></div>

      {/* Top Header Plate */}
      <div className={styles.headerPlate}>
        <div className={styles.brand}>
          <span className={styles.brandTitle}>{title}</span>
          <span className={styles.brandModel}>{model}</span>
        </div>
        <div className={styles.statusGroup}>
          <span className={styles.statusLabel}>STATUS</span>
          <div className={`${styles.ledDot} ${getLEDClass()}`}></div>
        </div>
      </div>

      {/* Screen Groove containing the content */}
      <div className={styles.screenGroove}>
        <div className={styles.screenInner}>
          {/* CRT scanlines and glare glaze */}
          <div className={styles.scanlines}></div>
          <div className={styles.glare}></div>

          {/* Child content container */}
          <div className={`${styles.contentContainer} ${!power ? styles.powerOff : ''}`}>
            {children}
          </div>

          {/* Offline/Standby Clickable Shield */}
          {!power && (
            <div className={styles.offlineShield} onClick={handleOfflineClick}>
              <div className={styles.scanlines}></div>
              <div className={styles.offlineText}>
                <span className={styles.flicker}>[ STANDBY ]</span>
                <span className={styles.subText}>FLIP POWER SWITCH TO START</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className={styles.controlBar}>
        <div className={styles.powerSwitchSection}>
          <span className={styles.controlLabel}>POWER</span>
          <button
            type="button"
            className={`${styles.toggleSwitch} ${power ? styles.toggleSwitchOn : ''}`}
            onClick={handlePowerToggle}
            aria-label={`Toggle power for ${title}`}
          >
            <div className={styles.switchHandle}></div>
          </button>
        </div>
        <div className={styles.ventilationGrill}>
          <div className={styles.ventSlot}></div>
          <div className={styles.ventSlot}></div>
          <div className={styles.ventSlot}></div>
          <div className={styles.ventSlot}></div>
          <div className={styles.ventSlot}></div>
        </div>
      </div>
    </div>
  );
};
