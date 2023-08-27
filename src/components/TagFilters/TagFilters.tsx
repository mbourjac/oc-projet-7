import { SetStateAction, Dispatch } from 'react';
import { TagButton } from './TagButton';
import { ITag } from './TagFilters.types';
import styles from './TagFilters.module.scss';

interface TagFiltersProps {
  tags: ITag[];
  handleTagsUpdate: Dispatch<SetStateAction<ITag[]>>;
  handleTagsShuffle: () => void;
  tagsClasses?: string;
}

export const TagFilters = ({
  tags,
  handleTagsUpdate,
  handleTagsShuffle,
  tagsClasses,
}: TagFiltersProps) => {
  const handleResetAll = () => {
    const resetAllTagButtons = (tagButtons: ITag[]) =>
      tagButtons.map((tagButton) => ({
        ...tagButton,
        selected: false,
      }));

    handleTagsUpdate(resetAllTagButtons);
  };

  const handleTagSelection = (tag: string) => {
    const updateSelectedTagButtons = (tagButtons: ITag[]) =>
      tagButtons.map((tagButton) =>
        tagButton.tag !== tag
          ? tagButton
          : { tag, isSelected: !tagButton.isSelected }
      );

    handleTagsUpdate(updateSelectedTagButtons);
  };

  const selectedTags = tags.filter(({ isSelected }) => isSelected);
  const allTagsSelected = selectedTags.length === tags.length;
  const noTagSelected = selectedTags.length === 0;

  return (
    <div className={`${styles.tags} ${tagsClasses ?? ''}`.trim()}>
      <button
        onClick={handleTagsShuffle}
        disabled={allTagsSelected}
        className={styles.control}
        aria-label="Afficher de nouveaux filtres"
      >
        Nouveaux
      </button>
      <button
        onClick={handleResetAll}
        disabled={noTagSelected}
        className={styles.control}
        aria-label="Désélectionner tous les filtres"
      >
        Réinitialiser
      </button>
      {tags.map(({ tag, isSelected }) => (
        <TagButton
          key={tag}
          tagLabel={tag}
          isSelected={isSelected}
          handleTagSelection={() => handleTagSelection(tag)}
        />
      ))}
    </div>
  );
};
