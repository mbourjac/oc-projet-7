import { useState } from 'react';
import { CollapsibleButton } from './CollapsibleButton';
import { CollapsiblePanel } from './CollapsiblePanel';
import styles from './Collapsible.module.scss';

type CollapsibleProps = {
  title: string;
  content: string | string[];
  collapsibleClasses?: string;
};

export const Collapsible = ({
  title,
  content,
  collapsibleClasses,
}: CollapsibleProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  return (
    <article className={`${styles.collapsible} ${collapsibleClasses ?? ''}`}>
      <CollapsibleButton
        title={title}
        isCollapsed={isCollapsed}
        handleCollapse={handleCollapse}
      />
      <CollapsiblePanel content={content} isCollapsed={isCollapsed} />
    </article>
  );
};
