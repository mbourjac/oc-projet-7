import styles from './Tag.module.scss';

type TagButtonProps = {
  tagLabel: string;
  selected: boolean;
  handleTagSelection: () => void;
};

export const TagButton = ({
  tagLabel,
  selected,
  handleTagSelection,
}: TagButtonProps) => {
  return (
    <button
      onClick={handleTagSelection}
      className={`${styles.tag} ${selected ? styles.selected : ''}`.trim()}
      aria-label={`${
        selected ? 'Désélectionner' : 'Sélectionner'
      } le filtre ${tagLabel}`}
    >
      {`${tagLabel.charAt(0).toUpperCase()}${tagLabel.slice(1)}`}
    </button>
  );
};
