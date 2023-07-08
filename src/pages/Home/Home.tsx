import { Suspense, useState } from 'react';
import {
  defer,
  useLoaderData,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { CardList } from '../../components/CardList/CardList';
import { CardListSkeleton } from '../../components/CardList/CardListSkeleton';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller';
import { IRoom, IGetRooms } from '../../data/rooms/rooms.types';
import {
  RoomsRepository,
  JsonRoomsRepository,
} from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import infiniteScrollerStyles from '../../components/InfiniteScroller/InfiniteScroller.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

type LoaderData = {
  data: Promise<IGetRooms>;
  roomsRepository: RoomsRepository;
  roomsLimit: number;
  tagFilter: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const tagFilter = url.searchParams.get('tag') || undefined;
  const roomsRepository = new JsonRoomsRepository(roomsJson, 3000);
  const roomsLimit = roomsRepository.roomsLimit;
  const data = roomsRepository.getRooms(1, tagFilter);

  return defer({
    data,
    roomsRepository,
    roomsLimit,
    tagFilter,
  });
};

export const Home = () => {
  const { data, roomsRepository, roomsLimit, tagFilter } =
    useLoaderData() as LoaderData;
  const [nextRooms, setNextRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = Math.ceil(nextRooms.length / roomsLimit) + 1;

  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  const loadNext = async () => {
    setIsLoading(true);
    const { rooms } = await roomsRepository.getRooms(
      currentPage + 1,
      tagFilter
    );
    setNextRooms((prevRooms) => [...prevRooms, ...rooms]);
    setIsLoading(false);
  };

  return (
    <>
      <Banner image={bannerImage}>
        <h1 className={styles.heading}>
          Chez vous,
          <br className={styles.break} /> partout et ailleurs
        </h1>
      </Banner>
      <Suspense
        fallback={
          <>
            <section className={styles.rooms}>
              <CardListSkeleton length={roomsLimit} />
            </section>
            <div className={infiniteScrollerStyles.spacer}></div>
          </>
        }
      >
        <Await resolve={data}>
          {({
            rooms: initialRooms,
            meta: { pages },
          }: Awaited<LoaderData['data']>) => {
            const isLastPage = currentPage === pages;

            return (
              <>
                <section className={styles.rooms}>
                  <CardList rooms={initialRooms} />
                  {nextRooms.length > 0 && <CardList rooms={nextRooms} />}
                </section>
                {!isLastPage && (
                  <InfiniteScroller
                    loadNext={loadNext}
                    currentPage={currentPage}
                    isLoading={isLoading}
                  />
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};
