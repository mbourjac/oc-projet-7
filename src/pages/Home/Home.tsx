import { Suspense } from 'react';
import { defer, useLoaderData, Await } from 'react-router-dom';
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

type LoaderData = {
  rooms: Promise<IRoom[]>;
};

export const loader = async () => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);

  return defer({ rooms: roomsRepository.getRooms() });
};

export const Home = () => {
  const loaderData = useLoaderData() as LoaderData;
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
          fallback={Array.from({ length: 9 }, (_) => (
            <CardSkeleton key={nanoid()} />
          ))}
        >
          <Await resolve={loaderData.rooms}>
            {(rooms: Awaited<LoaderData['rooms']>) => {
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
    </>
  );
};
