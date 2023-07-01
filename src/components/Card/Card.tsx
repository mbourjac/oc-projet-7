import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

type CardProps = {
  id: string;
  cover: string;
  title: string;
};

export const Card = ({ id, cover, title }: CardProps) => {
  return (
    <Link to={`rooms/${id}`}>
      <article className={styles.card}>
        <img src={cover} alt="" className={styles.cover} />
        <h2 className={styles.title}>{title}</h2>
      </article>
    </Link>
  );
};
