import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Banner } from '../../components/Banner/Banner';
import { Card } from '../../components/Card/Card';
import { CardSkeleton } from '../../components/Card/CardSkeleton';
import { Pagination } from '../../components/Pagination/Pagination';
import { IRoom } from '../../data/rooms/rooms.types';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import styles from './Home.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

export const Home = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomsRepository = useMemo(
    () => new JsonRoomsRepository(roomsJson, 3000),
    []
  );
  const roomsLimit = roomsRepository.roomsLimit;
  const currentPage = Number(searchParams.get('page')) || 1;

  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  useEffect(() => {
    const loadRooms = async () => {
      setIsLoading(true);

      try {
        const {
          rooms,
          meta: { pages },
        } = await roomsRepository.getRooms(currentPage);

        setRooms(rooms);
        setIsLastPage(pages === currentPage);
      } catch (error) {
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [searchParams]);

  return (
    <>
      <Banner image={bannerImage}>
        <h1 className={styles.heading}>
          Chez vous,
          <br className={styles.break} /> partout et ailleurs
        </h1>
      </Banner>
      <section className={styles.rooms}>
        {isLoading
          ? Array.from({ length: roomsLimit }, (_) => (
              <CardSkeleton key={nanoid()} />
            ))
          : rooms.map(({ id, cover, title }) => (
              <Card key={id} id={id} cover={cover} title={title} />
            ))}
      </section>
      <Pagination
        currentPage={currentPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
      />
    </>
  );
};
