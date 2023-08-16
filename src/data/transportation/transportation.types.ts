import { Address } from './transportation.address';

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

export interface IJourney {
  origin: Address;
  destination: Address;
}

export interface IDuration {
  hours: number;
  mode: string;
}
