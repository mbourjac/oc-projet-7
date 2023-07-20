import { SetStateAction, Dispatch } from 'react';
import { nanoid } from 'nanoid';
import { TagButton } from '../Tag/TagButton';
import { ITag } from '../Tag/tag.types';
import styles from './TagSearch.module.scss';

interface TagSearchProps {
  tags: ITag[];
  handleTagsUpdate: Dispatch<SetStateAction<ITag[]>>;
  handleTagsShuffle: () => void;
}

export const TagSearch = ({
  tags,
  handleTagsUpdate,
  handleTagsShuffle,
}: TagSearchProps) => {
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
          : { tag, selected: !tagButton.selected }
      );

    handleTagsUpdate(updateSelectedTagButtons);
  };

  const selectedTags = tags.filter(({ selected }) => selected);
  const allTagsSelected = selectedTags.length === tags.length;
  const noTagSelected = selectedTags.length === 0;

  return (
    <section className={styles.tags}>
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
      {tags.map(({ tag, selected }) => (
        <TagButton
          key={nanoid()}
          tagLabel={tag}
          selected={selected}
          handleTagSelection={() => handleTagSelection(tag)}
        />
      ))}
    </section>
  );
};
