import { useEffect, useState, SetStateAction, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TagFilters } from '../../components/TagFilters/TagFilters';
import { TagFiltersSkeleton } from '../../components/TagFilters/TagFiltersSkeleton';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { CardList } from '../../components/CardList/CardList';
import { CardListSkeleton } from '../../components/CardList/CardListSkeleton';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import { IRoom } from '../../data/rooms/rooms.types';
import { ITag } from '../../components/Tag/tag.types';
import styles from './Rooms.module.scss';
import infiniteScrollerStyles from '../../components/InfiniteScroller/InfiniteScroller.module.scss';
import roomsJson from '../../data/rooms/rooms.json';

const roomsRepository = new JsonRoomsRepository(roomsJson);

export const Rooms = () => {
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');
  const roomsLimit = roomsRepository.roomsLimit;

  const [rooms, setRooms] = useState<IRoom[] | null>(null);
  const [allUniqueTags, setAllUniqueTags] = useState<string[]>([]);
  const [tagButtons, setTagButtons] = useState<ITag[]>([]);
  const [isLoadingNextRooms, setIsLoadingNextRooms] = useState(false);
  const [lastPage, setLastPage] = useState<number | undefined>();

  const getCurrentPage = (rooms: IRoom[]) =>
    Math.ceil(rooms.length / roomsLimit);
  const getSelectedTags = () =>
    tagButtons.filter(({ selected }) => selected).map(({ tag }) => tag);

  const loadNextRooms = useCallback(async () => {
    if (!rooms) return;

    setIsLoadingNextRooms(true);

    const nextPage = getCurrentPage(rooms) + 1;
    const { rooms: nextRooms } = await roomsRepository.getRooms(
      nextPage,
      getSelectedTags()
    );

    setRooms((prevRooms) =>
      prevRooms ? [...prevRooms, ...nextRooms] : nextRooms
    );
    setIsLoadingNextRooms(false);
  }, [rooms, tagButtons]);

  const getRandomTagButtons = (
    count: number,
    selectedTags: string[] = []
  ): ITag[] => {
    const filteredTags = allUniqueTags.filter(
      (tag) => !selectedTags.includes(tag)
    );
    const randomTags = new Set<string>([]);

    while (randomTags.size < count - selectedTags.length) {
      const randomIndex = Math.floor(Math.random() * filteredTags.length);
      const randomTag = filteredTags[randomIndex];
      randomTags.add(randomTag);
    }

    return Array.from(randomTags).map((tag) => ({
      tag,
      selected: false,
    }));
  };

  useEffect(() => {
    const loadInitialRooms = async () => {
      setRooms(null);

      const {
        rooms,
        meta: { pages },
      } = await roomsRepository.getRooms(1, getSelectedTags());

      setRooms(rooms);
      setLastPage(pages);
    };

    loadInitialRooms();
  }, [tagButtons]);

  useEffect(() => {
    const loadAllUniqueTags = async () => {
      const allUniqueTags = await roomsRepository.getAllUniqueTags();

      setAllUniqueTags(allUniqueTags);
    };

    loadAllUniqueTags();
  }, []);

  useEffect(() => {
    if (allUniqueTags.length === 0) return;

    const randomTags = getRandomTagButtons(10, tagParam ? [tagParam] : []);

    setTagButtons(
      tagParam
        ? [{ tag: tagParam, selected: true }, ...randomTags]
        : [...randomTags]
    );
  }, [allUniqueTags, tagParam]);

  const handleTagsUpdate = useCallback(
    (updatedTagButtons: SetStateAction<ITag[]>) => {
      setTagButtons(updatedTagButtons);
    },
    [tagButtons]
  );

  const handleTagsShuffle = useCallback(async () => {
    const randomTags = getRandomTagButtons(10, getSelectedTags());

    setTagButtons((prevTagButtons) => {
      return [
        ...prevTagButtons.filter(({ selected }) => selected),
        ...randomTags,
      ];
    });
  }, [tagButtons, allUniqueTags]);

  const isLoadingInitialRooms = rooms === null;
  const hasRooms = rooms?.length ?? 0 > 0;
  const isLoadingTagButtons = tagButtons.length === 0;
  const isLastPage = (rooms: IRoom[]) =>
    getCurrentPage(rooms) === lastPage || lastPage === 0;

  return (
    <>
      {isLoadingTagButtons ? (
        <TagFiltersSkeleton />
      ) : (
        <TagFilters
          tags={tagButtons}
          handleTagsUpdate={handleTagsUpdate}
          handleTagsShuffle={handleTagsShuffle}
        />
      )}
      <CardContainer>
        {isLoadingInitialRooms ? (
          <CardListSkeleton length={roomsLimit} />
        ) : hasRooms ? (
          <CardList rooms={rooms} />
        ) : (
          <p className={styles['no-match']}>
            Aucun logement ne correspond à ces critères.
          </p>
        )}
      </CardContainer>
      {isLoadingInitialRooms ? (
        <div className={infiniteScrollerStyles.spacer}></div>
      ) : (
        !isLastPage(rooms) && (
          <InfiniteScroller
            loadNext={loadNextRooms}
            currentPage={getCurrentPage(rooms)}
            isLoading={isLoadingNextRooms}
          />
        )
      )}
    </>
  );
};
