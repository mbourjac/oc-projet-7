import { Address } from './transportation.address';

export type TransportationModes = 'walking' | 'bike' | 'publicTransport';

export type ITransportation = Map<TransportationModes, number>;

export interface IAddress {
  number?: string;
  street: string;
  city: string;
  postcode?: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
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

export interface INavitiaJourneyData {
  duration: number;
  sections: any[];
}
