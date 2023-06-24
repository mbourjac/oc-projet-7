import { IRoom } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string): Promise<IRoom | null>;
  getRooms(): Promise<IRoom[]>;
}

export class JsonRoomsRepository implements RoomsRepository {
  constructor(private rooms: IRoom[]) {}

  async getRoom(id: string): Promise<IRoom | null> {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async getRooms(): Promise<IRoom[]> {
    return this.rooms;
  }
}
