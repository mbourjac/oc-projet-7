import { RatingStar } from './RatingStar';
import styles from './Rating.module.scss';

type RatingProps = {
  rating: number;
  ratingClasses?: string;
};

export const Rating = ({ rating, ratingClasses }: RatingProps) => {
  return (
    <div className={`${styles.rating} ${ratingClasses ?? ''}`.trim()}>
      {Array.from({ length: 5 }, (_, index) => (
        <RatingStar
          key={index}
          pathClasses={index < rating ? styles.checked : ''}
        />
      ))}
    </div>
  );
};
