import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './Collapsible.module.scss';
import dropdownIcon from '@images/dropdown.svg';

type CollapsibleProps = {
  title: string;
  content: string | string[];
  className?: string;
};

export const Collapsible = ({
  title,
  content,
  className,
}: CollapsibleProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

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

  return (
    <article className={`${styles.collapsible} ${className ?? ''}`}>
      <button className={styles.button} onClick={handleCollapse}>
        {title}
        <img
          src={dropdownIcon}
          alt=""
          className={`${styles.icon} ${isCollapsed ? '' : styles.rotate}`}
        />
      </button>
      <div
        className={styles.panel}
        style={{ maxHeight: `${maxHeight}px` }}
        ref={panelRef}
      >
        {typeof content === 'string' ? (
          <p className={styles.content}>{content}</p>
        ) : (
          <ul className={styles.content}>
            {content.map((item) => (
              <li key={nanoid()}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};
