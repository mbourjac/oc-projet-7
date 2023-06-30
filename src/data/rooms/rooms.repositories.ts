import { IRoom } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(page: number): Promise<IRoom[]>;
  getRoomsRest(): Promise<number>;
  isRoomsLastPage(page: number): Promise<boolean>;
}

abstract class AbstractRoomsRepository implements RoomsRepository {
  readonly roomsLimit = 9;

  abstract getRoom(id: string | undefined): Promise<IRoom | null>;
  abstract getRooms(page: number): Promise<IRoom[]>;
  abstract getRoomsRest(): Promise<number>;
  abstract isRoomsLastPage(page: number): Promise<boolean>;
}

export class JsonRoomsRepository extends AbstractRoomsRepository {
  constructor(private readonly rooms: IRoom[], private readonly delay = 0) {
    super();
  }

  async getRoom(id: string | undefined): Promise<IRoom | null> {
    await this.withDelay();
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async getRooms(page: number): Promise<IRoom[]> {
    await this.withDelay();

    const startIndex = (page - 1) * this.roomsLimit;
    const endIndex = startIndex + this.roomsLimit;

    return this.rooms.slice(startIndex, endIndex);
  }

  async getRoomsRest() {
    return this.rooms.length % this.roomsLimit;
  }

  async isRoomsLastPage(page: number): Promise<boolean> {
    const totalPages = Math.ceil(this.rooms.length / this.roomsLimit);

    return page === totalPages;
  }

  private withDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
