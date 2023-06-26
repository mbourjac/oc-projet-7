import { nanoid } from 'nanoid';
import { CarouselSkeleton } from '../../components/Carousel/CarouselSkeleton';
import { TagSkeleton } from '../../components/Tag/TagSkeleton';
import { CollapsibleSkeleton } from '../../components/Collapsible/CollapsibleSkeleton';
import { Star } from '../../components/Star/Star';
import styles from './RoomSkeleton.module.scss';
import starStyles from '../../components/Star/Star.module.scss';
import roomStyles from './Room.module.scss';
import collapsibleSkeletonStyles from '../../components/Collapsible/CollapsibleSkeleton.module.scss';

export const RoomSkeleton = () => {
  return (
    <>
      <CarouselSkeleton />
      <div className={roomStyles.information}>
        <div className={styles.title}></div>
        <div className={styles.location}></div>
        <div className={roomStyles.tags}>
          {Array.from({ length: 3 }, (_) => (
            <TagSkeleton key={nanoid()} />
          ))}
        </div>
        <div className={roomStyles.rating}>
          {Array.from({ length: 5 }, (_) => (
            <Star key={nanoid()} pathClasses={starStyles.skeleton} />
          ))}
        </div>
        <div className={styles.name}>
          <div className={styles['name-line']}></div>
          <div className={styles['name-line']}></div>
        </div>
        <div className={`${roomStyles.picture} ${styles.picture}`}></div>
      </div>
      <div className={roomStyles.collapsibles}>
        <CollapsibleSkeleton classes={collapsibleSkeletonStyles.small} />
        <CollapsibleSkeleton classes={collapsibleSkeletonStyles.small} />
      </div>
    </>
  );
};
