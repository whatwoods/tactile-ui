import React from 'react';
import styles from './OneStepPhotoGrid.module.css';

export interface OneStepPhotoItem {
  alt?: string;
  label?: React.ReactNode;
  src?: string;
  state?: 'image' | 'failed' | 'openGallery' | 'more';
  onClick?: () => void;
}

export interface OneStepPhotoGridProps {
  date?: React.ReactNode;
  items: OneStepPhotoItem[];
  className?: string;
}

const STATE_LABELS: Record<NonNullable<OneStepPhotoItem['state']>, string> = {
  image: '',
  failed: '加载失败',
  openGallery: '打开图库',
  more: '加载更多',
};

export const OneStepPhotoGrid: React.FC<OneStepPhotoGridProps> = ({
  date,
  items,
  className = '',
}) => {
  const rootClass = [styles.grid, className].filter(Boolean).join(' ');
  const visibleItems = items.slice(0, 3);

  return (
    <div className={rootClass}>
      {date && <div className={styles.dateLabel}>{date}</div>}
      <div className={styles.row} aria-label="OneStep 最近图片">
        {visibleItems.map((item, index) => {
          const state = item.state ?? 'image';
          const label = item.label ?? STATE_LABELS[state];
          const Component = item.onClick ? 'button' : 'div';
          const itemClass = [
            styles.item,
            state === 'image' ? styles.imageTile : styles[state],
            item.onClick ? styles.clickable : '',
          ].filter(Boolean).join(' ');

          return (
            <Component
              key={`${state}-${index}`}
              className={itemClass}
              onClick={item.onClick}
              type={item.onClick ? 'button' : undefined}
              aria-label={typeof label === 'string' && label ? label : item.alt}
            >
              {state === 'image' && item.src ? (
                <img className={styles.imageMedia} src={item.src} alt={item.alt ?? ''} />
              ) : (
                <span className={styles.placeholder} aria-hidden="true" />
              )}
              {state === 'failed' && <span className={styles.failLabel}>{label}</span>}
              {(state === 'openGallery' || state === 'more') && (
                <span className={styles.actionLabel}>{label}</span>
              )}
            </Component>
          );
        })}
      </div>
    </div>
  );
};
