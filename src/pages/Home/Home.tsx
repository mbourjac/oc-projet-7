import { Banner } from '../../components/Banner/Banner';
import { Card } from '../../components/Card/Card';
import styles from './Home.module.scss';
import rooms from '../../data/rooms.json';
import bannerImage from '@images/home-banner.jpg';

export const Home = () => {
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
