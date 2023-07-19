import { IRoom, IGetRooms } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(page: number, tags?: string[]): Promise<IGetRooms>;
  getAllUniqueTags(): Promise<string[]>;
}

abstract class AbstractRoomsRepository implements RoomsRepository {
  readonly roomsLimit = 9;

  abstract getRoom(id: string | undefined): Promise<IRoom | null>;
  abstract getRooms(page: number, tags?: string[]): Promise<IGetRooms>;
  abstract getAllUniqueTags(): Promise<string[]>;
}

export class JsonRoomsRepository extends AbstractRoomsRepository {
  constructor(
    private readonly rooms: IRoom[],
    private readonly delay = Math.random() * 2000
  ) {
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

  async getAllUniqueTags(): Promise<string[]> {
    await this.withDelay();
    const tagsSet = new Set<string>();

    this.rooms.map(({ tags }) => {
      tags.map((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
  }

  private withDelay(delay?: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay || this.delay));
  }
}
