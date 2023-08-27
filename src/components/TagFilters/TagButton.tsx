import styles from './TagButton.module.scss';

type TagButtonProps = {
  tagLabel: string;
  isSelected: boolean;
  handleTagSelection: () => void;
};

export const TagButton = ({
  tagLabel,
  isSelected,
  handleTagSelection,
}: TagButtonProps) => {
  const capitalizedTagLabel = `${tagLabel
    .charAt(0)
    .toUpperCase()}${tagLabel.slice(1)}`;

  return (
    <button
      onClick={handleTagSelection}
      className={`${styles.tag} ${isSelected ? styles.selected : ''}`.trim()}
      aria-label={`${
        isSelected ? 'Désélectionner' : 'Sélectionner'
      } le filtre ${tagLabel}`}
    >
      {capitalizedTagLabel}
    </button>
  );
};
