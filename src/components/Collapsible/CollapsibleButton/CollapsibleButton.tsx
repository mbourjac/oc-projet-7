import styles from './CollapsibleButton.module.scss';
import dropdownIcon from '@images/dropdown.svg';

type CollapsibleButtonProps = {
  isCollapsed: boolean;
  title: string;
  handleCollapse: () => void;
};

export const CollapsibleButton = ({
  isCollapsed,
  title,
  handleCollapse,
}: CollapsibleButtonProps) => {
  const iconAltText = isCollapsed
    ? 'Afficher le contenu'
    : 'Masquer le contenu';

  return (
    <button className={styles.button} onClick={handleCollapse}>
      {title}
      <img
        src={dropdownIcon}
        alt={iconAltText}
        className={`${styles.icon} ${isCollapsed ? '' : styles.rotate}`}
      />
    </button>
  );
};
