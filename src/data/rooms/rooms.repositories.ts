import { IRoom } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(page: number): Promise<IRoom[]>;
}

abstract class AbstractRoomsRepository implements RoomsRepository {
  protected readonly roomsLimit = 9;

  abstract getRoom(id: string | undefined): Promise<IRoom | null>;
  abstract getRooms(page: number): Promise<IRoom[]>;

  getLimit(): number {
    return this.roomsLimit;
  }
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

  private withDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
