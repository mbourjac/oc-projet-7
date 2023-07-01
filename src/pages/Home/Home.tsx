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
import { IRoom } from '../../data/rooms/rooms.types';
import { LoadMore } from '../../components/LoadMore/LoadMore';
import type { AwaitedData } from '../../utils/utils.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';
import { LoadMoreSkeleton } from '../../components/LoadMore/LoadMoreSkeleton';

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
  const { data, currentPage, roomsLimit, totalPages } =
    useLoaderData() as LoaderData;
  const [moreRooms, setMoreRooms] = useState<IRoom[]>([]);
  const fetcher = useFetcher<AwaitedData<LoaderData>>();

  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }

    if (fetcher.data) {
      const newRooms = fetcher.data.data;

      setMoreRooms((prevRooms) => [...prevRooms, ...newRooms]);
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
            {(rooms: Awaited<LoaderData['data']>) => {
              return <CardList rooms={rooms} />;
            }}
          </Await>
        </Suspense>
        {moreRooms && <CardList rooms={moreRooms} />}
        {fetcher.state === 'loading' && (
          <CardListSkeleton length={roomsLimit} />
        )}
      </section>
      <Suspense fallback={<LoadMoreSkeleton />}>
        <Await resolve={data}>
          {(_) => {
            return (
              <LoadMore
                loaderData={{
                  currentPage,
                  totalPages,
                }}
                fetcher={fetcher}
                isIndex={true}
              />
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};
