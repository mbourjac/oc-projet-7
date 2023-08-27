import { useState } from 'react';
import { CarouselButton } from './CarouselButton';
import styles from './Carousel.module.scss';
import nextButton from '@images/next-button.svg';
import prevButton from '@images/prev-button.svg';

type CarouselProps = {
  pictures: string[];
};

export const Carousel = ({ pictures }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const picturesCount = pictures.length;
  const shouldShowNavigation = picturesCount > 1;

  const handleShowPrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + picturesCount) % picturesCount);
  };

  const handleShowNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % picturesCount);
  };

  return (
    <div className={styles.carousel}>
      <img src={pictures[index]} alt="" className={styles.image} />
      {shouldShowNavigation && (
        <>
          <div className={styles.nav}>
            <CarouselButton
              src={prevButton}
              alt="Afficher l'image précédente"
              handleNavigation={handleShowPrevious}
            />
            <CarouselButton
              src={nextButton}
              alt="Afficher l'image suivante"
              handleNavigation={handleShowNext}
            />
          </div>
          <p className={styles.pagination}>
            <span className={styles.index}>{index + 1}</span>/
            <span>{picturesCount}</span>
          </p>
        </>
      )}
    </div>
  );
};
