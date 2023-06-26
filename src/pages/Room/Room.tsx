import { Suspense } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Carousel } from '../../components/Carousel/Carousel';
import { Tag } from '../../components/Tag/Tag';
import { Star } from '../../components/Star/Star';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import { IRoom } from '../../data/rooms/rooms.types';
import { NotFound } from '../../errors/errors.not-found';
import styles from './Room.module.scss';
import starStyles from '../../components/Star/Star.module.scss';
import collapsibleStyles from '../../components/Collapsible/Collapsible.module.scss';
import roomsJson from '../../data/rooms/rooms.json';

type LoaderData = {
  room: Promise<IRoom | null>;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);

  return defer({ room: roomsRepository.getRoom(params.id) });
};

export const Room = () => {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<h2>Loading room...</h2>}>
      <Await resolve={loaderData.room}>
        {(room: Awaited<LoaderData['room']>) => {
          if (!room) {
            throw new NotFound();
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
                      <Star key={nanoid()} pathClasses={starStyles.checked} />
                    ) : (
                      <Star key={nanoid()} />
                    )
                  )}
                </div>
                <p className={styles.name}>
                  <span>{hostFirstName}</span>
                  <span>{hostLastName}</span>
                </p>
                <img
                  src={room.host.picture}
                  alt=""
                  className={styles.picture}
                />
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
        }}
      </Await>
    </Suspense>
  );
};
