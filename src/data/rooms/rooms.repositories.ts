import { Room } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string): Promise<Room | null>;
  getRooms(): Promise<Room[]>;
}

export class JsonRoomsRepository implements RoomsRepository {
  constructor(private rooms: Room[]) {}

  async getRoom(id: string): Promise<Room | null> {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }
}
