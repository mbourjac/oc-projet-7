import styles from './RoomHostSkeleton.module.scss';
import roomHostStyles from './RoomHost.module.scss';

type RoomHostSkeletonProps = {
  hostClasses?: string;
};

export const RoomHostSkeleton = ({ hostClasses }: RoomHostSkeletonProps) => {
  return (
    <div className={`${roomHostStyles.host} ${hostClasses ?? ''}`.trim()}>
      <div className={styles.name}>
        <div className={styles['name-line']}></div>
        <div className={styles['name-line']}></div>
      </div>
      <div className={`${roomHostStyles.picture} ${styles.picture}`}></div>
    </div>
  );
};
