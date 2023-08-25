import { useEffect, useRef, useState } from 'react';
import styles from './CollapsiblePanel.module.scss';

type CollapsiblePanelProps = {
  isCollapsed: boolean;
  content: string | string[];
};

export const CollapsiblePanel = ({
  isCollapsed,
  content,
}: CollapsiblePanelProps) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMaxHeight = () => {
      if (!panelRef.current) {
        throw Error('contentRef is not assigned');
      }

      setMaxHeight(isCollapsed ? 0 : panelRef.current.scrollHeight);
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, [isCollapsed]);

  const isContentString = typeof content === 'string';

  return (
    <div
      className={styles.panel}
      style={{ maxHeight: `${maxHeight}px` }}
      ref={panelRef}
    >
      {isContentString ? (
        <p className={styles.content}>{content}</p>
      ) : (
        <ul className={styles.content}>
          {content.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
