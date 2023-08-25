import { useDocumentTitle } from '../../hooks/use-document.title';
import { Banner } from '../../components/Banner/Banner';
import { RoomCard } from '../../components/RoomCard/RoomCard';
import styles from './Home.module.scss';
import rooms from '../../data/rooms/rooms.json';
import bannerImageS from '@images/home-banner-s.jpg';
import bannerImageM from '@images/home-banner-m.jpg';
import bannerImageL from '@images/home-banner-l.jpg';

export const Home = () => {
  useDocumentTitle('Kasa');
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
          <RoomCard key={id} id={id} cover={cover} title={title} />
        ))}
      </section>
    </>
  );
};
