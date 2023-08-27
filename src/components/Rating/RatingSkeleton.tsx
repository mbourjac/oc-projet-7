import { RatingStar } from './RatingStar';
import ratingStyles from './Rating.module.scss';
import ratingStarStyles from './RatingStar.module.scss';

type RatingSkeletonProps = {
  ratingClasses?: string;
};

export const RatingSkeleton = ({ ratingClasses }: RatingSkeletonProps) => {
  return (
    <div className={`${ratingStyles.rating} ${ratingClasses ?? ''}`.trim()}>
      {Array.from({ length: 5 }, (_, index) => (
        <RatingStar key={index} pathClasses={ratingStarStyles.skeleton} />
      ))}
    </div>
  );
};
