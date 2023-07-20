import { IRoom, IGetRooms } from './rooms.types';

export interface RoomsRepository {
  getRoom(id: string | undefined): Promise<IRoom | null>;
  getRooms(
    page: number,
    tags?: string[],
    searchQuery?: string
  ): Promise<IGetRooms>;
  getAllUniqueTags(): Promise<string[]>;
}

abstract class AbstractRoomsRepository implements RoomsRepository {
  readonly roomsLimit = 9;

  abstract getRoom(id: string | undefined): Promise<IRoom | null>;
  abstract getRooms(
    page: number,
    tags?: string[],
    searchQuery?: string
  ): Promise<IGetRooms>;
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

  async getRooms(
    page: number,
    tags?: string[],
    searchQuery?: string
  ): Promise<IGetRooms> {
    await this.withDelay();

    let filteredRooms = this.rooms;

    if (tags && tags.length > 0) {
      filteredRooms = this.filterRoomsByTags(filteredRooms, tags);
    }

    if (searchQuery) {
      filteredRooms = this.filterRoomsBySearchQuery(filteredRooms, searchQuery);
    }

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

  private filterRoomsByTags(rooms: IRoom[], tags: string[]): IRoom[] {
    return rooms.filter((room) =>
      tags.every((tag) =>
        room.tags.some((roomTag) => roomTag.toLowerCase() === tag.toLowerCase())
      )
    );
  }

  private filterRoomsBySearchQuery(
    rooms: IRoom[],
    searchQuery: string
  ): IRoom[] {
    const normalizedString = (string: string) =>
      string
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    const isMatch = (roomTerm: string): boolean => {
      const normalizedRoomTerm = normalizedString(roomTerm);
      const normalizedSearchTerms = normalizedString(searchQuery).split(' ');

      return normalizedSearchTerms.some((normalizedSearchTerm) =>
        this.isSimilarByLevenshtein(normalizedRoomTerm, normalizedSearchTerm)
      );
    };

    return rooms.filter((room) => {
      const roomProperties = [room.title, room.description, room.equipments];
      const roomTerms = roomProperties
        .flat()
        .flatMap((string) => string.split(' '));

      return roomTerms.some((roomTerm) => isMatch(roomTerm));
    });
  }

  private isSimilarByLevenshtein(source: string, target: string): boolean {
    const allowedDistance = 1;
    const distance = this.calculateLevenshteinDistance(source, target);
    return distance <= allowedDistance;
  }

  private calculateLevenshteinDistance(source: string, target: string): number {
    const sourceLength = source.length;
    const targetLength = target.length;
    const distanceMatrix: number[][] = [];

    for (let i = 0; i <= sourceLength; i++) {
      distanceMatrix[i] = [i];
    }

    for (let j = 1; j <= targetLength; j++) {
      distanceMatrix[0][j] = j;
    }

    for (let i = 1; i <= sourceLength; i++) {
      for (let j = 1; j <= targetLength; j++) {
        const cost = source[i - 1] !== target[j - 1] ? 1 : 0;
        distanceMatrix[i][j] = Math.min(
          distanceMatrix[i - 1][j] + 1,
          distanceMatrix[i][j - 1] + 1,
          distanceMatrix[i - 1][j - 1] + cost
        );
      }
    }

    return distanceMatrix[sourceLength][targetLength];
  }

  private withDelay(delay?: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay || this.delay));
  }
}
