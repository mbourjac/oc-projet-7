import { Card } from '../Card/Card';
import { IRoom } from '../../data/rooms/rooms.types';

type CardListProps = {
  rooms: IRoom[];
};

export const CardList = ({ rooms }: CardListProps) => {
  return rooms.map(({ id, cover, title }) => (
    <Card key={id} id={id} cover={cover} title={title} />
  ));
};
