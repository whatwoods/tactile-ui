import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  rows?: number;
  animated?: boolean;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  rows = 1,
  animated = true,
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  if (variant === 'text' && rows > 1) {
    return (
      <div className={[styles.stack, className].filter(Boolean).join(' ')} {...props}>
        {Array.from({ length: rows }).map((_, index) => (
          <span
            key={index}
            className={[styles.skeleton, styles.text, animated ? styles.animated : ''].filter(Boolean).join(' ')}
            style={{
              width: index === rows - 1 ? '61.8%' : width,
              height,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={[
        styles.skeleton,
        styles[variant],
        animated ? styles.animated : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};
