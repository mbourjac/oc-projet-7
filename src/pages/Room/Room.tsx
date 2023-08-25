import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';
import { Carousel } from '../../components/Carousel/Carousel';
import { RoomInfo } from '../../components/RoomInfo/RoomInfo';
import { Collapsible } from '../../components/Collapsible/Collapsible';
import styles from './Room.module.scss';
import rooms from '../../data/rooms/rooms.json';
import { useDocumentTitle } from '../../hooks/use-document.title';

export const Room = () => {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === id);

  if (!room) {
    return <NotFound />;
  }

  const { title, pictures, description, equipments } = room;

  useDocumentTitle(title);

  return (
    <>
      <Carousel pictures={pictures} />
      <RoomInfo room={room} />
      <section className={styles.collapsibles}>
        <Collapsible title="Description" content={description} />
        <Collapsible title="Équipements" content={equipments} />
      </section>
    </>
  );
};
