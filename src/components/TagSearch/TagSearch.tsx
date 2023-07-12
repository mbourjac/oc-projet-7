import {
  useState,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { nanoid } from 'nanoid';
import { TagButton } from '../Tag/TagButton';
import styles from './TagSearch.module.scss';

interface TagSearchProps {
  tags: string[];
  onTagsChange: Dispatch<SetStateAction<string[]>>;
}

export const TagsSearch = ({ tags, onTagsChange }: TagSearchProps) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();

    if (tag === '') return;

    onTagsChange((prevTags) =>
      prevTags.includes(tag) ? prevTags : [...prevTags, tag]
    );
    setTagInput('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      addTag();
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  return (
    <section className={styles.filters}>
      <div className={styles.controls}>
        <input
          type="search"
          value={tagInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
          aria-label="Chercher un filtre"
        />
        <button
          onClick={addTag}
          disabled={tagInput.trim() === ''}
          className={styles.search}
        >
          Chercher
        </button>
      </div>
      <div className={styles.tags}>
        <button
          onClick={handleClearAll}
          disabled={tags.length === 0}
          className={styles.clear}
          aria-label="Réinitialiser les filtres"
        >
          Réinitialiser
        </button>
        {tags.map((tag) => (
          <TagButton
            key={nanoid()}
            tag={tag}
            handleTagRemove={() => handleTagRemove(tag)}
          />
        ))}
      </div>
    </section>
  );
};
