export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  address: {
    number: number;
    street: string;
    postcode: number;
    city: string;
  };
  coordinates: ICoordinates;
}

export interface ITrip {
  origin: ILocation;
  destination: ILocation;
  distanceInKm: number;
}

export interface IDuration {
  hours: number;
  mode: string;
}
