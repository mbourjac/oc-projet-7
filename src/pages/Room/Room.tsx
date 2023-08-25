import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { NotFound } from '../NotFound/NotFound';
import { Carousel } from '../../components/Carousel/Carousel';
import { Tag } from '../../components/Tag/Tag';
import { RatingStar } from '../../components/RatingStar/RatingStar';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import styles from './Room.module.scss';
import collapsibleStyles from '../../components/Collapsible/Collapsible.module.scss';
import rooms from '../../data/rooms/rooms.json';

export const Room = () => {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === id);

  if (!room) {
    return <NotFound />;
  }

  const [hostFirstName, hostLastName] = room.host.name.split(' ');

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
              <RatingStar key={nanoid()} isOn={true} />
            ) : (
              <RatingStar key={nanoid()} isOn={false} />
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
          collapsibleClasses={collapsibleStyles.small}
        />
        <Collapsible
          title="Équipements"
          content={room.equipments}
          collapsibleClasses={collapsibleStyles.small}
        />
      </section>
    </>
  );
};
