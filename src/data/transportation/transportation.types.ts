import { Address } from './transportation.address';
import { TransportationStrategy } from './transportation.strategy';

export type TransportationModes = 'walking' | 'bike' | 'publicTransport';

export type TransportationStrategies = Record<string, TransportationStrategy>;

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

export type ISearchResult =
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

export interface INavitiaJourneyData {
  duration: number;
  sections: any[];
}
