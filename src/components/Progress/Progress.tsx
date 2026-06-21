import React from 'react';
import styles from './Progress.module.css';

export interface ProgressProps {
  value?: number; // 0 to 100
}

export const Progress: React.FC<ProgressProps> = ({ value = 0 }) => {
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className={styles.fill} 
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle glossy overlay */}
          <div className={styles.gloss}></div>
        </div>
      </div>
    </div>
  );
};
