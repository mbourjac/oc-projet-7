import { Suspense, useEffect, useState } from 'react';
import {
  defer,
  useLoaderData,
  Await,
  LoaderFunctionArgs,
  useFetcher,
  redirect,
} from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { CardList } from '../../components/CardList/CardList';
import { CardListSkeleton } from '../../components/CardList/CardListSkeleton';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller';
import { IRoom } from '../../data/rooms/rooms.types';
import type { AwaitedData } from '../../utils/utils.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import infiniteScrollerStyles from '../../components/InfiniteScroller/InfiniteScroller.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

type LoaderData = {
  data: Promise<IRoom[]>;
  currentPage: number;
  roomsLimit: number;
  totalPages: number;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);
  const totalPages = await roomsRepository.getTotalPages();

  const url = new URL(request.url);
  const currentPage = Number(url.searchParams.get('page')) || 1;

  if (currentPage > totalPages) {
    return redirect('/');
  }

  const roomsLimit = roomsRepository.roomsLimit;
  const data = roomsRepository.getRooms(currentPage);

  return defer({
    data,
    currentPage,
    roomsLimit,
    totalPages,
  });
};

export const Home = () => {
  const {
    data,
    currentPage: initialPage,
    roomsLimit,
    totalPages,
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
      const nextRooms = fetcher.data.data;

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
          <Await resolve={data}>
            {(initialRooms: Awaited<LoaderData['data']>) => (
              <CardList rooms={initialRooms} />
            )}
          </Await>
        </Suspense>
        {nextRooms && <CardList rooms={nextRooms} />}
      </section>
      <Suspense
        fallback={<div className={infiniteScrollerStyles.spacer}></div>}
      >
        <Await resolve={data}>
          {(_) => {
            const currentPage = fetcher.data
              ? fetcher.data.currentPage
              : initialPage;
            const nextPage = currentPage + 1;
            const isLastPage = currentPage === totalPages;

            return (
              !isLastPage && (
                <InfiniteScroller<AwaitedData<LoaderData>>
                  fetcher={fetcher}
                  nextPage={nextPage}
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
