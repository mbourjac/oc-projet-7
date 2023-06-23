import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { NotFound } from '../NotFound/NotFound';
import { Carousel } from '../../components/Carousel/Carousel';
import { Tag } from '../../components/Tag/Tag';
import { Star } from '../../components/Star/Star';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import styles from './Room.module.scss';
import rooms from '../../data/rooms.json';

export const Room = () => {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === id);

  if (!room) {
    return <NotFound />;
  }

  const [hostFirstName, hostLastName] = room.host.name.split(' ');
  const collapsibleStyle = {
    button: {
      fontSize: '1.125rem',
    },
  };

  return (
    <>
      <Carousel pictures={room.pictures} />
      <section className={styles.information}>
        <h1 className={styles.title}>{room.title}</h1>
        <p className={styles.location}>{room.location}</p>
        <div className={styles.tags}>
          {room.tags.map((tag) => (
            <Tag key={nanoid()} tag={tag} />
          ))}
        </div>
        <div className={styles.rating}>
          {Array.from({ length: 5 }, (_, index) =>
            index < +room.rating ? (
              <Star key={nanoid()} isChecked={true} />
            ) : (
              <Star key={nanoid()} isChecked={false} />
            )
          )}
        </div>
        <p className={styles.name}>
          <span>{hostFirstName}</span>
          <span>{hostLastName}</span>
        </p>
        <img src={room.host.picture} alt="" className={styles.picture} />
      </section>
      <section className={styles.collapsibles}>
        <Collapsible
          title="Description"
          content={room.description}
          customStyle={collapsibleStyle}
        />
        <Collapsible
          title="Équipements"
          content={room.equipments}
          customStyle={collapsibleStyle}
        />
      </section>
    </>
  );
};
