import { useState } from 'react';
import { CarouselButton } from './CarouselButton/CarouselButton';
import styles from './Carousel.module.scss';
import nextButton from '@images/next-button.svg';
import prevButton from '@images/prev-button.svg';

type CarouselProps = {
  pictures: string[];
};

export const Carousel = ({ pictures }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const picturesCount = pictures.length;

  const handleShowPrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + picturesCount) % picturesCount);
  };

  const handleShowNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % picturesCount);
  };

  return (
    <div className={styles.carousel}>
      <img src={pictures[index]} alt="" className={styles.image} />
      {picturesCount > 1 && (
        <div className={styles.nav}>
          <CarouselButton
            src={prevButton}
            alt="Image précédente"
            handleNavigation={handleShowPrevious}
          />
          <CarouselButton
            src={nextButton}
            alt="Image suivante"
            handleNavigation={handleShowNext}
          />
        </div>
      )}
    </div>
  );
};
