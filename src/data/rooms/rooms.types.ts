export interface IRoom {
  id: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: {
    name: string;
    picture: string;
  };
  rating: string;
  location: string;
  equipments: string[];
  tags: string[];
}

export interface IGetRooms {
  meta: {
    count: number;
    pages: number;
  };
  rooms: IRoom[];
}
