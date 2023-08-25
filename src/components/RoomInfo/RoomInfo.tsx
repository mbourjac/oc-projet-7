import { RoomHost } from './RoomHost/RoomHost';
import { RoomTags } from './RoomTags/RoomTags';
import { Rating } from '../Rating/Rating';
import { IRoom } from '../../data/rooms/rooms.types';
import styles from './RoomInfo.module.scss';

type RoomInfoProps = {
  room: IRoom;
};

export const RoomInfo = ({
  room: { title, location, host, tags, rating },
}: RoomInfoProps) => {
  return (
    <section className={styles.info}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.location}>{location}</p>
      <RoomHost host={host} hostClasses={styles.host} />
      <RoomTags tags={tags} tagsClasses={styles.tags} />
      <Rating rating={+rating} ratingClasses={styles.rating} />
    </section>
  );
};
