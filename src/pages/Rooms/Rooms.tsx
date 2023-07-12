import { useEffect, useState, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TagsSearch } from '../../components/TagSearch/TagSearch';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { CardList } from '../../components/CardList/CardList';
import { CardListSkeleton } from '../../components/CardList/CardListSkeleton';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import { IRoom } from '../../data/rooms/rooms.types';
import styles from './Rooms.module.scss';
import infiniteScrollerStyles from '../../components/InfiniteScroller/InfiniteScroller.module.scss';
import roomsJson from '../../data/rooms/rooms.json';

const roomsRepository = new JsonRoomsRepository(roomsJson, 3000);

export const Rooms = () => {
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');

  const [rooms, setRooms] = useState<IRoom[] | null>(null);
  const [tags, setTags] = useState<string[]>(tagParam ? [tagParam] : []);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [lastPage, setLastPage] = useState<number | undefined>();

  const roomsLimit = roomsRepository.roomsLimit;
  const getCurrentPage = (rooms: IRoom[]) =>
    Math.ceil(rooms.length / roomsLimit);

  const loadNext = async () => {
    if (!rooms) return;

    setIsLoadingNextPage(true);

    const nextPage = getCurrentPage(rooms) + 1;
    const { rooms: nextRooms } = await roomsRepository.getRooms(nextPage, tags);

    setRooms((prevRooms) =>
      prevRooms ? [...prevRooms, ...nextRooms] : nextRooms
    );
    setIsLoadingNextPage(false);
  };

  const handleTagsChange = (updatedTags: SetStateAction<string[]>) => {
    setTags(updatedTags);
  };

  useEffect(() => {
    const loadRooms = async () => {
      setRooms(null);

      const {
        rooms,
        meta: { pages },
      } = await roomsRepository.getRooms(1, tags);

      setRooms(rooms);
      setLastPage(pages);
    };

    loadRooms();
  }, [tags]);

  return (
    <>
      <TagsSearch tags={tags} onTagsChange={handleTagsChange} />
      <CardContainer>
        {rooms === null ? (
          <CardListSkeleton length={roomsLimit} />
        ) : rooms.length > 0 ? (
          <CardList rooms={rooms} />
        ) : (
          <p className={styles['no-match']}>
            Aucun logement ne correspond à ces critères.
          </p>
        )}
      </CardContainer>
      {rooms === null ? (
        <div className={infiniteScrollerStyles.spacer}></div>
      ) : (
        !(getCurrentPage(rooms) === lastPage || lastPage === 0) && (
          <InfiniteScroller
            loadNext={loadNext}
            currentPage={getCurrentPage(rooms)}
            isLoading={isLoadingNextPage}
          />
        )
      )}
    </>
  );
};
