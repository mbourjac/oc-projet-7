import { Link } from 'react-router-dom';
import styles from './RoomCard.module.scss';

type RoomCardProps = {
  id: string;
  cover: string;
  title: string;
};

export const RoomCard = ({ id, cover, title }: RoomCardProps) => {
  return (
    <Link to={`/rooms/${id}`}>
      <article className={styles.card}>
        <img src={cover} alt="" className={styles.cover} />
        <h2 className={styles.title}>{title}</h2>
      </article>
    </Link>
  );
};
