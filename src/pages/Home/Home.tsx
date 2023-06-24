import { useLoaderData } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { Card } from '../../components/Card/Card';
import { Room } from '../../data/rooms/rooms.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

export const loader = async (): Promise<Room[]> => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);

  return roomsRepository.getRooms();
};

export const Home = () => {
  const rooms = useLoaderData() as Awaited<ReturnType<typeof loader>>;
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
        {rooms.map(({ id, cover, title }) => (
          <Card key={id} id={id} cover={cover} title={title} />
        ))}
      </section>
    </>
  );
};
