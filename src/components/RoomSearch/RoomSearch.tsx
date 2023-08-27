import { Dispatch, SetStateAction } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { TagFilters } from '../TagFilters/TagFilters';
import { SearchFormSkeleton } from '../SearchForm/SearchFormSkeleton';
import { TagListSkeleton } from '../TagListSkeleton/TagListSkeleton';
import { ITag } from '../TagFilters/TagFilters.types';
import styles from './RoomSearch.module.scss';

type RoomSearchProps = {
  tagButtons: ITag[];
  handleRoomSearch: (searchQuery: string) => void;
  handleTagsUpdate: Dispatch<SetStateAction<ITag[]>>;
  handleTagsShuffle: () => void;
};

export const RoomSearch = ({
  tagButtons,
  handleRoomSearch,
  handleTagsUpdate,
  handleTagsShuffle,
}: RoomSearchProps) => {
  const isLoadingTagButtons = tagButtons.length === 0;

  return (
    <section className={styles.search}>
      {isLoadingTagButtons ? (
        <>
          <SearchFormSkeleton />
          <TagListSkeleton length={12} />
        </>
      ) : (
        <>
          <SearchForm handleRoomSearch={handleRoomSearch} />
          <TagFilters
            tags={tagButtons}
            handleTagsUpdate={handleTagsUpdate}
            handleTagsShuffle={handleTagsShuffle}
          />
        </>
      )}
    </section>
  );
};
