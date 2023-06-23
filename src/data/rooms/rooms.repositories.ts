import { Room } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string): Promise<Room | null>;
  getRooms(): Promise<Room[]>;
}
