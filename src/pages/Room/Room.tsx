import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Carousel } from '../../components/Carousel/Carousel';
import { Tag } from '../../components/Tag/Tag';
import { Star } from '../../components/Star/Star';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import { IRoom } from '../../data/rooms/rooms.types';
import styles from './Room.module.scss';
import roomsJson from '../../data/rooms/rooms.json';
import collapsibleStyles from '../../components/Collapsible/Collapsible.module.scss';
import { NotFound } from '../../errors/errors.not-found';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<IRoom> => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);
  const room = await roomsRepository.getRoom(params.id);

  if (!room) {
    throw new NotFound();
  }

  return room;
};

export const Room = () => {
  const room = useLoaderData() as Awaited<ReturnType<typeof loader>>;
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
          className={collapsibleStyles.small}
        />
        <Collapsible
          title="Équipements"
          content={room.equipments}
          className={collapsibleStyles.small}
        />
      </section>
    </>
  );
};
