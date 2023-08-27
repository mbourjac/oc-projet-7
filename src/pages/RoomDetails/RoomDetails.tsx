import { Suspense } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom';
import { Carousel } from '../../components/Carousel/Carousel';
import { RoomInfo } from '../../components/RoomInfo/RoomInfo';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import { Transportation } from '../../components/Transportation/Transportation';
import { RoomDetailsSkeleton } from './RoomDetailsSkeleton';
import { JsonRoomsRepository } from '../../data/rooms/rooms.repositories';
import { IRoom } from '../../data/rooms/rooms.types';
import { NotFound } from '../../errors/errors.not-found';
import styles from './RoomDetails.module.scss';
import roomsJson from '../../data/rooms/rooms.json';

type LoaderData = {
  room: Promise<IRoom | null>;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const roomsRepository = new JsonRoomsRepository(roomsJson);

  return defer({ room: roomsRepository.getRoom(params.id) });
};

export const RoomDetails = () => {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<RoomDetailsSkeleton />}>
      <Await resolve={loaderData.room}>
        {(room: Awaited<LoaderData['room']>) => {
          if (!room) {
            throw new NotFound();
          }

          const { pictures, description, equipments, address } = room;

          return (
            <>
              <Carousel pictures={pictures} />
              <RoomInfo room={room} />
              <section className={styles.collapsibles}>
                <Collapsible title="Description" content={description} />
                <Collapsible title="Équipements" content={equipments} />
              </section>
              <Transportation roomAddress={address} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};
