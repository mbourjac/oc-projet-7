import { useDocumentTitle } from '../../hooks/use-document.title';
import { Banner } from '../../components/Banner/Banner';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import styles from './About.module.scss';
import collapsibleStyles from '../../components/Collapsible/Collapsible.module.scss';
import values from '../../data/values/values.json';
import bannerImageS from '@images/about-banner-s.jpg';
import bannerImageM from '@images/about-banner-m.jpg';
import bannerImageL from '@images/about-banner-l.jpg';

export const About = () => {
  useDocumentTitle('À propos');
  const bannerImage = {
    small: bannerImageS,
    medium: bannerImageM,
    large: bannerImageL,
  };

  return (
    <>
      <Banner image={bannerImage} />
      <section className={styles.values}>
        {values.map(({ title, content }) => (
          <Collapsible
            key={title}
            title={title}
            content={content}
            collapsibleClasses={collapsibleStyles.large}
          />
        ))}
      </section>
    </>
  );
};
