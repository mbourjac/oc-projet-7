import { IRoom } from '../../../data/rooms/rooms.types';
import styles from './RoomHost.module.scss';

type RoomHostProps = {
  host: IRoom['host'];
  hostClasses?: string;
};

export const RoomHost = ({
  host: { name, picture },
  hostClasses,
}: RoomHostProps) => {
  const [firstName, lastName] = name.split(' ');

  return (
    <div className={`${styles.host} ${hostClasses ?? ''}`.trim()}>
      <p className={styles.name}>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </p>
      <img
        src={picture}
        alt="Photo de profil de l'hôte"
        className={styles.picture}
      />
    </div>
  );
};
