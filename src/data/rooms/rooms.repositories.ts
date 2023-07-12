import { BadRequest } from '../../errors/errors.bad-request';
import { IRoom, IGetRooms } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(page: number, tags?: string[]): Promise<IGetRooms>;
}

abstract class AbstractRoomsRepository implements RoomsRepository {
  readonly roomsLimit = 9;

  abstract getRoom(id: string | undefined): Promise<IRoom | null>;
  abstract getRooms(page: number, tags?: string[]): Promise<IGetRooms>;
}

export class JsonRoomsRepository extends AbstractRoomsRepository {
  constructor(private readonly rooms: IRoom[], private readonly delay = 0) {
    super();
  }

  async getRoom(id: string | undefined): Promise<IRoom | null> {
    await this.withDelay();
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async getRooms(page: number, tags?: string[]): Promise<IGetRooms> {
    await this.withDelay();

    const filteredRooms = tags
      ? this.rooms.filter((room) =>
          tags.every((tag) =>
            room.tags.some(
              (roomTag) => roomTag.toLowerCase() === tag.toLowerCase()
            )
          )
        )
      : this.rooms;
    const startIndex = (page - 1) * this.roomsLimit;
    const endIndex = startIndex + this.roomsLimit;
    const rooms = filteredRooms.slice(startIndex, endIndex);

    if (rooms.length === 0) {
      throw new BadRequest();
    }

    const count = filteredRooms.length;
    const pages = Math.ceil(count / this.roomsLimit);

    return {
      meta: {
        count,
        pages,
      },
      rooms,
    };
  }

  private withDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
