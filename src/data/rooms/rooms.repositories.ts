import { IRoom } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(): Promise<IRoom[]>;
}

export class JsonRoomsRepository implements RoomsRepository {
  constructor(private rooms: IRoom[], private delay: number = 0) {}

  async getRoom(id: string | undefined): Promise<IRoom | null> {
    await this.withDelay();
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async getRooms(): Promise<IRoom[]> {
    await this.withDelay();
    return this.rooms;
  }

  private withDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
