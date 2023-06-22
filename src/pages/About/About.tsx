import { nanoid } from 'nanoid';
import { Banner } from '../../components/Banner/Banner';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import styles from './About.module.scss';
import services from '../../data/services.json';
import bannerImage from '@images/about-banner.jpg';

export const About = () => {
  return (
    <>
      <Banner image={bannerImage} />
      <section className={styles.services}>
        {services.map(({ title, content }) => (
          <Collapsible key={nanoid()} title={title} content={content} />
        ))}
      </section>
    </>
  );
};
