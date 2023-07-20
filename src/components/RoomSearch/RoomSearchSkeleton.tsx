import styles from './RoomSearchSkeleton.module.scss';
import roomSearchStyles from './RoomSearch.module.scss';

export const RoomSearchSkeleton = () => {
  return (
    <div className={roomSearchStyles.search}>
      <div className={styles.input}></div>
    </div>
  );
};
