import { RoomHostSkeleton } from '../RoomHost/RoomHostSkeleton';
import { TagListSkeleton } from '../TagListSkeleton/TagListSkeleton';
import { RatingSkeleton } from '../Rating/RatingSkeleton';
import styles from './RoomInfoSkeleton.module.scss';
import roomInfoStyles from './RoomInfo.module.scss';

export const RoomInfoSkeleton = () => {
  return (
    <div className={roomInfoStyles.info}>
      <div className={styles.title}></div>
      <div className={styles.location}></div>
      <RoomHostSkeleton hostClasses={roomInfoStyles.host} />
      <TagListSkeleton length={3} tagsClasses={roomInfoStyles.tags} />
      <RatingSkeleton ratingClasses={roomInfoStyles.rating} />
    </div>
  );
};
