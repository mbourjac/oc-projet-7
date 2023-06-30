import { Suspense } from 'react';
import {
  defer,
  useLoaderData,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Banner } from '../../components/Banner/Banner';
import { Card } from '../../components/Card/Card';
import { CardSkeleton } from '../../components/Card/CardSkeleton';
import { IRoom } from '../../data/rooms/rooms.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';
import { Pagination } from '../../components/Pagination/Pagination';

type LoaderData = {
  roomsPromise: Promise<IRoom[]>;
  currentPage: number;
  isLastPage: boolean;
  roomsLimit: number;
  roomsRest: number;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const roomsRepository = new JsonRoomsRepository(roomsJson);
  const roomsPromise = roomsRepository.getRooms(currentPage);
  const isLastPage = await roomsRepository.isRoomsLastPage(currentPage);
  const roomsLimit = roomsRepository.roomsLimit;
  const roomsRest = await roomsRepository.getRoomsRest();

  return defer({
    roomsPromise,
    currentPage,
    isLastPage,
    roomsLimit,
    roomsRest,
  });
};

export const Home = () => {
  const { roomsPromise, currentPage, isLastPage, roomsLimit, roomsRest } =
    useLoaderData() as LoaderData;
  const roomsLength = isLastPage ? roomsRest : roomsLimit;

  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  return (
    <>
      <Banner image={bannerImage}>
        <h1 className={styles.heading}>
          Chez vous,
          <br className={styles.break} /> partout et ailleurs
        </h1>
      </Banner>
      <section className={styles.rooms}>
        <Suspense
          fallback={Array.from({ length: roomsLength }, (_) => (
            <CardSkeleton key={nanoid()} />
          ))}
        >
          <Await resolve={roomsPromise}>
            {(rooms: Awaited<LoaderData['roomsPromise']>) => {
              return (
                <>
                  {rooms.map(({ id, cover, title }) => (
                    <Card key={id} id={id} cover={cover} title={title} />
                  ))}
                </>
              );
            }}
          </Await>
        </Suspense>
      </section>
      <Pagination currentPage={currentPage} isLastPage={isLastPage} />
    </>
  );
};
