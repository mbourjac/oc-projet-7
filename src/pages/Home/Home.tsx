import { Suspense, useEffect, useState } from 'react';
import {
  defer,
  useLoaderData,
  Await,
  LoaderFunctionArgs,
  useFetcher,
  useAsyncError,
} from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { CardList } from '../../components/CardList/CardList';
import { CardListSkeleton } from '../../components/CardList/CardListSkeleton';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller';
import { IRoom, IGetRooms } from '../../data/rooms/rooms.types';
import type { AwaitedData } from '../../utils/utils.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import infiniteScrollerStyles from '../../components/InfiniteScroller/InfiniteScroller.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

type LoaderData = {
  data: Promise<IGetRooms>;
  roomsLimit: number;
  currentPage: number;
  tagFilter: string;
};

const AwaitError = () => {
  const asyncError = useAsyncError();

  if (asyncError) throw asyncError;

  return null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const tagFilter = url.searchParams.get('tag') || undefined;
  const roomsRepository = new JsonRoomsRepository(roomsJson);
  const roomsLimit = roomsRepository.roomsLimit;
  const data = roomsRepository.getRooms(currentPage, tagFilter);

  return defer({
    data,
    roomsLimit,
    currentPage,
    tagFilter,
  });
};

export const Home = () => {
  const {
    data,
    roomsLimit,
    currentPage: initialPage,
    tagFilter,
  } = useLoaderData() as LoaderData;
  const [nextRooms, setNextRooms] = useState<IRoom[]>([]);
  const fetcher = useFetcher<AwaitedData<LoaderData>>();

  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  useEffect(() => {
    if (fetcher.data && fetcher.state !== 'loading') {
      const { rooms: nextRooms } = fetcher.data.data;

      setNextRooms((prevRooms) => [...prevRooms, ...nextRooms]);
    }
  }, [fetcher.data]);

  return (
    <>
      <Banner image={bannerImage}>
        <h1 className={styles.heading}>
          Chez vous,
          <br className={styles.break} /> partout et ailleurs
        </h1>
      </Banner>
      <section className={styles.rooms}>
        <Suspense fallback={<CardListSkeleton length={roomsLimit} />}>
          <Await resolve={data} errorElement={<AwaitError />}>
            {({ rooms: initialRooms }: Awaited<LoaderData['data']>) => (
              <CardList rooms={initialRooms} />
            )}
          </Await>
        </Suspense>
        {nextRooms && <CardList rooms={nextRooms} />}
      </section>
      <Suspense
        fallback={<div className={infiniteScrollerStyles.spacer}></div>}
      >
        <Await resolve={data} errorElement={<AwaitError />}>
          {({ meta: { pages } }: Awaited<LoaderData['data']>) => {
            const currentPage = fetcher.data
              ? fetcher.data.currentPage
              : initialPage;
            const isLastPage = currentPage === pages;

            return (
              !isLastPage && (
                <InfiniteScroller<AwaitedData<LoaderData>>
                  fetcher={fetcher}
                  nextPage={currentPage + 1}
                  tag={tagFilter}
                  isIndex={true}
                />
              )
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};
