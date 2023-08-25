import { Address } from './transportation.address';

export type TransportationModes = 'walking' | 'bike' | 'bus';

export type ITransportation = {
  [mode in TransportationModes]?: number;
};

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  number?: string;
  street: string;
  city: string;
  postcode?: string;
}

export interface IJourney {
  origin: Address;
  destination: Address;
}

export interface IDuration {
  mode: TransportationModes;
  seconds: number;
}

export interface ISearchResult {
  success: boolean;
  result: string;
}
