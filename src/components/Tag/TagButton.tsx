import styles from './TagButton.module.scss';
import removeIcon from '@images/remove-icon.svg';

type TagButtonProps = {
  tag: string;
  handleTagRemove: () => void;
};

export const TagButton = ({ tag, handleTagRemove }: TagButtonProps) => {
  return (
    <button
      onClick={handleTagRemove}
      className={styles.tag}
      aria-label={`Supprimer le filtre ${tag}`}
    >
      <span className={styles.category}>{`${tag
        .charAt(0)
        .toUpperCase()}${tag.slice(1)}`}</span>
      <img
        src={removeIcon}
        alt="Icône de suppresion du filtre"
        className={styles.remove}
      />
    </button>
  );
};
