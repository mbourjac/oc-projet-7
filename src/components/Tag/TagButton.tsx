import styles from './Tag.module.scss';

type TagButtonProps = {
  tag: string;
  selected: boolean;
  handleTagSelection: () => void;
};

export const TagButton = ({
  tag,
  selected,
  handleTagSelection,
}: TagButtonProps) => {
  return (
    <button
      onClick={handleTagSelection}
      className={`${styles.tag} ${selected ? styles.selected : ''}`.trim()}
      aria-label={`${
        selected ? 'Désélectionner' : 'Sélectionner'
      } le filtre ${tag}`}
    >
      {`${tag.charAt(0).toUpperCase()}${tag.slice(1)}`}
    </button>
  );
};
